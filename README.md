# vuex-api

Simple vuex library to easily handle api calls.

Want to check out vue devtool ? Check this [demo](https://vuex-api-demo.netlify.com).

Want to check a [live demo](https://codesandbox.io/s/3rmllr9qp5), open console and see the mutations.


## Basic usage
Let's get posts from the free api [`https://jsonplaceholder.typicode.com/`](https://jsonplaceholder.typicode.com/) !


In your `store.js`, install the `vuex-api` module once:
```javascript
import vuexApi from 'vuex-api'

export default new Vuex.Store({
  modules: {
    vuexApi,
  },
})
``` 

Somewhere in your app:

```javascript
import { actions, getApiData } from 'vuex-api'
import { mapState } from 'vuex'

...

created: {
  this.$store.dispatch(actions.request, {
    baseURL: 'https://jsonplaceholder.typicode.com',
    method: 'GET',
    url: 'posts',
    // params: {} if need to add query params
    keyPath: ['post'] // Will set the namespace where it will be stored in the vuex state 
  }),
computed: mapState({
      postData: getApiData('post'),
    })
}

```

And... that's it ! 

Now let's have a look at your vuex state:

```
state: {
  vuexApi: {
    post: {
      status: 'success', // can be 'loading' and 'error' depending on the request status
      resp: {...}, // the resp obj from axios request
    }
  }
}
```

And moreover we provide you a list of helper functions to easily access data.

Note: Notice how the arguments are the ones you pass to an axios request, well they are the same indeed !

Only the `keyPath` argument is specific to vuex-api, it helps to have a namespace in the vuex state to store the request state.


## Make a Write request

```javascript
    methods: {
      sendPostReq: function () {
        this.$store.dispatch(actions.request, {
          requestConfig: { baseURL: 'https://jsonplaceholder.typicode.com' },
          method: 'POST',
          url: 'posts',
          data: { title: 'foo', userId: 2, body: 'bar' },
          keyPath: ['postPost']
        })
      }
    }
```

## Empty a vuex-api state

When you leave the page where you display all your posts, you might also want to empty the vuex store from its data since its not visible.
We got you covered with this handy action:

```javascript
    methods: {
      sendPostReq: function () {
        this.$store.dispatch(actions.clear, keyPath)
      }
    }
```


## vuex-api specific

The request object that you fire is mostly the Axios Request config object. 
However few vuex-api specifc arguments are here to help you:

- `keyPath: String | mandatory` set the store state attribute value under which the request state will be stored

- `onSuccess || onError : Object | mandatory`  The onSuccess object has 3 possible arguments: 
```
{
  onSuccess: { 
    dispatchAction: action, // the passed action will be dispatched 
    executeFunction: (resp, context),  // the passed function will be executed with the resp of the api and the vuex context 
    commitAction: action, // the passed action will be commited 
    }
}
```

## onSuccess example
Post a post then get all post when successful request:

```javascript
    methods: {
      sendPostReq: function () {
        this.$store.dispatch(actions.request, {
          requestConfig: { baseURL: 'https://jsonplaceholder.typicode.com' },
          method: 'POST',
          url: 'posts',
          data: { title: 'foo', userId: 2, body: 'bar' },
          keyPath: ['postPost'],
          onSuccess: { 
            dispatchAction: { 
              requestConfig: { 
                baseURL: 'https://jsonplaceholder.typicode.com' 
              },
             method: 'GET',
             url: 'posts',
             keyPath: ['post']
            }
          }
        })
      }
    }
```

## API
`vuex-api` exports:

### `getApiResp(keyPath, path, defaultValue)`
#### Arguments:
`keyPath`: define the path in `vuexState.vuexApi.keyPath` where the api data will be stored.

`path`: if you want to return a deeply nested value in the api response ( see `.get()` method in lodash )

`defaultValue`: default value returned if nothing found
#### Returns:
Response object of the api call.
```javascript
{
  data: {...},
  headers: {...}
}
```

### `getApiData(keyPath, path, defaultValue)`
#### Returns:
The api response data.

 
### `getApiStatus(keyPath, path, defaultValue)`
#### Returns:
Status of the api call:
 - undefined ( component not mounted yet or no actions fired)
 - `'loading'`
 - `'success'`
 - `'error'`
 
 
### `getApiState(keyPath, path, defaultValue)`
#### Returns:
whole state of the api call:
- when loading:
```
{
  status: 'loading'
}
```
- when success api call:
```
{
  status: 'success',
  firstCallDone: true,
  resp: {...}
}
```

- when failed api call:
```
{
  status: 'error',
  firstCallDone: true,
  err: {...}
}
```

## Advanced users

There is also another way to get data. This way does not handle directly actions, but delegate it to a component

### Create the `vuex-api` component that will make the api calls for you

In your `main.js` ( or in a component )
```javascript
import { ApiHandlerComponent } from 'vuex-api'
// you can pass an axios requestObject to all api calls made by <external-json-api/>
Vue.component('json-api', ApiHandlerComponent({ requestConfig: { baseURL: 'https://jsonplaceholder.typicode.com' } }))
```

Now you have a json-api component registered. All its API calls will be done w/ the given requestConfig object.
This mean that if you use multiple apis, same domain and external domains, you can make multiple api components :).

Now let's fetch the posts !

```html
<template>
  <div>
    <json-api url="post" keyPath="jsonPosts"/>
    <div v-for="post in posts">{{post}}</div>
  </div>
</template>
s
<script>
import { getApiResp } from 'vuex-api'
export default {
  computed: mapState({
    posts: getApiResp('jsonPosts'),
  }),
}
</script>
```



# vuex-api

Simple vuex library to easily handle api calls.

Also, there is this [demo](vuex-api-demo.netlify.com), open your vue dev tool to check the vuex state.

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
import pluginActions from 'plugin/actions'
import { mapState } from 'vuex'
import { getApiData } from './plugin'

...

created: {
  this.$store.dispatch(pluginActions.request, {
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
        this.$store.dispatch(pluginActions.request, {
          requestConfig: { baseURL: 'https://jsonplaceholder.typicode.com' },
          method: 'POST',
          url: 'posts',
          data: { title: 'foo', userId: 2, body: 'bar' },
          keyPath: ['postPost']
        })
      }
    }
```
## Request object

The request object that you fire is mostly the Axios Request config object. 
However one mandatory argument is:
- `keyPath: string` set the store state attribute value under which the request state will be stored


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



# vuex-api
## Introduction
This plugins aims to make api calls generic and handled predictably.

## As easy as pie
Let's get posts from the free api [`https://jsonplaceholder.typicode.com/`](https://jsonplaceholder.typicode.com/) !

1. In your `store.js`, install the `vuex-api` module once:
```javascript
import vuexApi from 'vuex-api'

export default new Vuex.Store({
  modules: {
    vuexApi,
  },
})
``` 

Great !

2. Create the `vuex-api` component that will make the api calls for you

In your `main.js` ( or in a component )
```javascript
import { ApiHandlerComponent } from 'vuex-api'
// you can pass an axios requestObject to all api calls made by <external-json-api/>
Vue.component('json-api', ApiHandlerComponent({ requestConfig: { baseURL: 'https://jsonplaceholder.typicode.com' } }))
```

Now you have a json-api component registered. All its API calls will be done w/ the given requestConfig object.
This mean that if you use multiple apis, same domain and external domains, you can make multiple api components :).

3. Now let's fetch the posts !

```html
<template>
  <div>
    <json-api url="post" keyPath="jsonPosts"/>
    <div v-for="post in posts">{{post}}</div>
  </div>
</template>

<script>
import { getApiResp } from 'vuex-api'
export default {
  computed: mapState({
    posts: getApiResp('jsonPosts'),
  }),
}
</script>
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
 
### `getApiStatus(keyPath, path, defaultValue)`
#### Arguments:
`keyPath`: define the path in `vuexState.vuexApi.keyPath` where the api data will be stored.

`path`: if you want to return a deeply nested value in the api response ( see `.get()` method in lodash )

`defaultValue`: default value returned if nothing found

#### Returns:
Status of the api call:
 - undefined ( component not mounted yet or no actions fired)
 - `'loading'`
 - `'success'`
 - `'error'`
 

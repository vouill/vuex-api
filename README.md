# vuex-api
## Introduction
This plugins aims to make api calls generic and handled predictably.

## As easy as pie
Let's get posts from the free api [`https://jsonplaceholder.typicode.com/`](https://jsonplaceholder.typicode.com/) !

1. In your `store.js`, install vuexApi once:
```javascript
import vuexApi from 'vuex-api'

export default new Vuex.Store({
  modules: {
    vuexApi,
  },
})
``` 

Great !
2. Create the vuex-api component that will make the api calls for you

in your `main.js` ( or in a component )
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
    <my-api url="post" keyPath="jsonPosts"/>
    <div v-for="post in posts">{{post}}</div>
  </div>
</template>

<script>
import { getApiData } from 'vuex-api'
export default {
  computed: mapState({
    posts: getApiData('jsonPosts'),
  }),
}
</script>
```

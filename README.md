# vuex-api
## Introduction
This plugins aims to make api calls generic and handled predictably.

## Usage
```html
<template>
  <div>
    <my-api url="articles/new" keyPath="newArticles"/>
    <article v-for="article in newArticles"/>s
  </div>
</template>
```


```javascript
import { getApiData } from 'vuex-api'
  ...
  computed: mapState({
    newArticles: getApiData('vue-bulma-components'),
  }),
  ...
```

## Instal

### Import the vuex-api module
In your `store.js`:
```javascript
import vuexApi from 'vuex-api'

export default new Vuex.Store({
  modules: {
    vuexApi,
  },
})
``` 

### In your component
In your `main.js`:

```javascript
import { ApiHandlerComponent } from 'vuex-api'
// register a same domain api
Vue.component('my-api', ApiHandlerComponent())
// register an external api
Vue.component('external-json-api', ApiHandlerComponent({ requestConfig: { baseURL: 'https://jsonplaceholder.typicode.com', headers: ... } }))
```

In your component:

```html
<div>
  <external-json-api url="comments" keyPath="commentsVuexState"/>
  <div>Is loading ? {{commentsStateStatus === 'loading'}}</div> 
  <div>response ? {{commentsStateResp}}</div>
</div>

<script>
  import { mapState } from 'vuex'
  import pluginActions from 'plugin/actions'
  import { getApiData } from './plugin'

  export default {
    computed: mapState({
      commentsStateStatus: getApiState('commentsVuexState', ['status']),
      commentsStateResp: getApiState('commentsVuexState', ['resp']),
    })
}
</script>
```

## What the fuck is happening here

Alright, take a seat and let's get trough this.

1. First import the vuexApi module in your vuex instance. this module will hold all the api data.
2. Create the api handler component (global or local doesn't matter).
```javascript
  Vue.component('my-api', ApiHandlerComponent())
  // if you huse headers, or maybe an external api you can pass an axios request config object
  Vue.component('external-json-api', ApiHandlerComponent({ requestConfig: { ... } }))
```
3. Get your data
```html
  <external-json-api url="comments" keyPath="commentsVuexState"/>
```
When the `<external-json-api/>` component will mount, it will dispatch a request action. at this point the vuex state will look like this:

```javascript
{
  vuexApi: {
    commentsVuexState: {
      status: 'loading'
    }
  }
}
``` 

When the request is successful it becomes:

```javascript
{
  vuexApi: {
    commentsVuexState: {
      status: 'success', 
      resp: { 
        // the api response object
      }
    }
  }
}
``` 

- You can easily display loading for cool user feedback
- You can then access the resp data through the vuex state, or by using a `vuex-api` helper

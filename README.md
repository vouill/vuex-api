# vuex-api
## Introduction
This plugins aims to make api calls generic and handled predictably.

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

### Create the Api caller component
In your `main.js`:

```javascript
import { ApiHandler } from 'vuex-api'

Vue.component('my-api', ApiHandler())
Vue.component('github-api', ApiHandler({ requestConfig: { baseURL: 'https://api.github.com' } }))
```

Finally when you want to get data:

```html
<div>
  <github-api url="repos/vouill/vue-geb/commits" keyPath="vue-geb"/>
</div>
```


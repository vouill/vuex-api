[![Build Status](https://travis-ci.org/vouill/vuex-api.svg?branch=master)](https://travis-ci.org/vouill/vuex-api)

# Vuex api

## Intro

`vuex-api` is a library that wants to help you handle API as easily as possible. Yes, that's it !



## Install

1. Make sure you have `vuex` set up in your app.
2. In your `store.js`, install the `vuex-api` module:

```javascript
import vuexApi from 'vuex-api'

export default new Vuex.Store({
  modules: {
    vuexApi,
  },
})
```

 

## Usage

This library allows you [multiple](#documentation) way to make and consume API calls. Here is an exemple of one of them:

```javascript
created: function () {
    this.vuexApiCall(
      {
        baseURL: 'https://jsonplaceholder.typicode.com', 
        url: 'posts', 
        keyPath: ['typicode', 'posts'] // is the to reach the data in your vuex state
        }
      )
  },
```



```html
// Render components based on the status of the API call. The component will have the api call status injected in their props automatically
<vuexApiHoc :keyPath="['typicode', 'posts']">
    <template slot="success"><feed-list/></template>
    <template slot="loading"><loading/></template>
    <template slot="error"><error/></template>
</vuexApiHoc>
```





## Motivation

You can do API calls for anything:

- getting a blog post
- create a recipe
- delete a user

However,  API calls are a pretty repetitive  when you think about it.

1. Emit the API call
2. Display loading (or not)
3. Receive Data
4. Display Data (or error)
5. Maybe as consequence execute custom code



This Library goals is to abstract this repetition from you. You only need to give the necessary data to perform the API call and that's it. The library will: 

- Handle the whole api call from loading to success and error
- Give you mixins and HOC to help you make and retrieve API calls.



## Documentation

Vuex-api is nothing but a vuex module. It listen to a certain action, with a payload that will be used to perform the API Call. Then it will store the different states of the response in the vuex state.

Because we have all the logic handled at one place, we can add tooling around that will help us reduce the pain to handle api calls.

This doc is split in 2 parts.

-> Sending API calls

-> Retrieve API call data

## Emit API calls

Emitting an API call will always require you to send the info necessary to perform the api request.

```
baseURL: 'https://jsonplaceholder.typicode.com' 
method: 'GET'
url: 'posts'
keyPath: ['article', 'slugId'] // the only attribute not shapped in the axios request object. I will define the path where the api call states will be stored in vuex.
```

The following are 3 independant methods to emit the same API call.

### Using store dispatch 

[>> Interactive demo](https://codesandbox.io/s/5yq65jrqop)

To emit a vuex-API call you need to fire an action with the following data:

```javascript
import { actions } from 'vuex-api'

created: function(){
    this.$store.dispatch(actions.request,{
        baseURL: 'https://jsonplaceholder.typicode.com', 
        url: 'posts', 
        keyPath: ['typicode', 'posts']
      }
    )
  },
```



### Using mixins

[>> Interactive demo](https://codesandbox.io/s/n92rmvk844)

```
mixins:[
    vuexApiCallMixin,
  ],
```



`vuexApiCallMixin` exposes to the vue component 2 methods:

- `vuexApiCall(VuexApiRequestObject)` Perform an API call using the passed VuexApiRequestObject
- `vuexApiClear(keyPath)` Clears the state at the given keypath



```javascript
created: function () {
    this.vuexApiCall(
      {
        baseURL: 'https://jsonplaceholder.typicode.com', 
        url: 'posts', 
        keyPath: ['typicode', 'posts']
        }
      )
  },
```



### Using a component

[>> Interactive demo](https://codesandbox.io/s/2p4q04pxj)

This one is mostly suited for GET calls. It's a pretty powerfull way to handle GET calls in a breaze.

```javascript
Vue.component('json-api', ApiHandlerComponent({ 
    requestConfig: { baseURL: 'https://jsonplaceholder.typicode.com' } 
}))
```

```html
<json-api url="posts" :keyPath="['typicode', 'posts']"/>
```



## Retrieve API call data

### Accessing state

[>> Interactive demo](https://codesandbox.io/s/5yq65jrqop)

You can get the data related to your API call directly from the vuex state as you would do normally

```javascript
this.$store.state.vuexApi.popular.feed

// or

computed: mapState({
 data = state => state.vuexApi.popular.feed   
})
```

### Using Mixin

[>> Interactive demo](https://codesandbox.io/s/n92rmvk844)

`vuexApiGetStateMixin(keyPath, attributeName?)` exposes to the vue component a computed value representing the state at the given keyPath under `this[attributeName]`.



### Use HOC

[>> Interactive demo](https://codesandbox.io/s/25lq28o0p)

This hoc will render the given child component depending on the status ate of the API Call. More over it will auto inject the api call response to the children in its props.

```html
<vuexApiHoc :key-path="['popular', 'feed']">
    <template slot="success"><feed-list/></template>
    <template slot="loading"><loading/></template>
    <template slot="error"><error/></template>
</vuexApiHoc>
```




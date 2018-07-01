/**
* Created by vouill on 7/1/18.
*/

<template>
  <div>
    Component child vuexApiData: {{ vuexApiData }}
  </div>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
    name: 'Child',
    props: { vuexApiData: Object },
  }
</script>

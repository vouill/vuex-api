/**
* Created by vouill on 1/23/18.
*/

<template>
  <div>
    from child: {{ data }}
  </div>
</template>

<script>
  export default {
    name: 'Child',
    components: {},
    props: ['data'],
    data () {
      return {}
    },
  }
</script>

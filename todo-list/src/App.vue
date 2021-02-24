<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
// import Vue from 'vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class App extends Vue {
  beforeCreate() {
    console.info(
      'you can read more about Vue lifeCycle hooks in https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram'
    )
    console.log('In beforeCreate')
  }
  created() {
    console.log('In created')
  }
  beforeMount() {
    console.log('In beforeMount')
  }
  mounted() {
    console.log('In mounted - I will call after my child loaded')
  }
  beforeUpdate() {
    console.log('In beforeUpdate')
  }
  updated() {
    console.log('In updated')
  }

  beforeDestroy() {
    console.log('In beforeDestroy')
  }

  destroyed() {
    console.log('In destroyed')
  }

  errorCaptured() {
    console.log('In errorCaptured')
  }
}
</script>

<template>
<v-app-bar 
      class="header"
      app
      color="primary"
      dark>
  <router-link to="/" >
      <v-toolbar-title class="title">
        🏠 {{title}}
      </v-toolbar-title>
    </router-link>
  <v-toolbar-items class="header-container">
    <div class="d-flex align-center">
      <div class="pa-2">built with</div>
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />

     </div>
  </v-toolbar-items>

  <div class="btns">
    <router-link class="hidden-sm-and-down v-btn  theme--dark v-size--default" text to="/todo">To do</router-link>
      <v-btn
       :to="{name:'About'}"
        text>
        <span class="mr-2">About</span>
        <v-icon>open_in_new</v-icon>
      </v-btn>
    </div>
    </v-app-bar>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

  @Component({})
  export default class HeaderComponent extends Vue {
    @Prop() title !: string

    mounted (){
      console.log('hello from app');
    }
    
  }

</script>

<style scoped lang="scss">
  .header {
    .title {
      color:white;
    }

  }
</style>

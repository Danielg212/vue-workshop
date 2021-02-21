<template>
  <v-app id="inspire">
    <tl-header :title="'I am prop from Dashboard 🐬'"></tl-header>
    <v-main>
        <router-view></router-view>
    </v-main>
</v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Dashboard extends Vue {}
</script>

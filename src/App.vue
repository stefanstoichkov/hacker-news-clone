<template>
  <v-app class="app-background ">
    <v-main :style="{ padding: '0px' }">
      <Navbar :style="{ padding: '0px' }" />
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
</script>


<style>
.app-background {
  background-color: #121212 !important;
  display: flex;
}
</style>
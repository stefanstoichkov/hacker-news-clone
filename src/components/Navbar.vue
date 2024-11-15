<template>
  <v-container class="mx-auto w-66">
    <v-alert v-if="!isOnline" type="error" color="red" class="offline-alert" dense>
      You are offline. Some features may not be available.
    </v-alert>

    <v-app-bar app class="header" :style="{ position: 'relative' }">
      <router-link to="/Home">
        <v-app-bar-nav-icon>
          <img src="../assets/favicon.png" alt="Logo" class="logo" />
        </v-app-bar-nav-icon>
      </router-link>
      <span class="mx-4" style="color: white; font-size: 18px;">Hacker News Search</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-if="route.path === '/Home'"
        v-model="search"
        placeholder="Search..."
        hide-details
        dense
        outlined
        class="search-input w-66"
        @input="onSearchInput"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-app-bar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import debounce from 'lodash.debounce'

const search = ref('')
const route = useRoute()
const router = useRouter()

const isOnline = ref(navigator.onLine)

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

const emitSearch = debounce((query) => {
  if (query.length >= 3 || query === '') {
    router.push({ path: route.path, query: { search: query } })
  }
}, 300)

const onSearchInput = () => {
  emitSearch(search.value)
}
</script>

<style scoped>
.logo {
  height: 40px;
  width: auto;
}

.search-input {
  background-color: #FFFFFF;
  color: #000000;
}

.v-app-bar.header {
  background-color: #FF742B;
}

.offline-alert {
  position: static;
  top: 0;
  left: 0;
  width: 100%;
  margin: auto;
}
</style>

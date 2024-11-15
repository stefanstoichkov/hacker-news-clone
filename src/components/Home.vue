<template>
  <v-container class="mx-auto px-0 py-0 w-66">
    <v-card
      v-for="post in posts"
      :key="post.objectID"
      class="my-0 rounded-0"
      style="background-color: #f6f6ef"
    >
      <v-card-title @click="navigateToPost(post)" style="cursor: pointer">
        <span class="text-body-1 font-weight-bold">{{ post.title }}</span>
        <span class="text-body-2" style="margin-left: 8px">({{ post.url }})</span>
      </v-card-title>
      <v-card-subtitle>
        {{ post.points }} points | {{ post.author }} | {{ formatDate(post.created_at) }} |
        {{ post.num_comments }} comments
      </v-card-subtitle>
    </v-card>

    <div class="pagination-container">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        class="w-50"
        color="primary"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { Post } from '@/types/Post';

const posts = ref<Post[]>([])
const currentPage = ref(1)
const hitsPerPage = 15
const totalPages = ref(0)
const route = useRoute()
const router = useRouter()


const fetchPosts = async () => {
  try {
    const response = await axios.get('https://hn.algolia.com/api/v1/search', {
      params: {
        tags: 'story',
        hitsPerPage: hitsPerPage,
        page: currentPage.value - 1,
        query: route.query.search || '',
      },
    })
    posts.value = response.data.hits
    totalPages.value = response.data.nbPages
  } catch (error) {
    console.error('Error fetching posts: ', error)
  }
}

const formatDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const navigateToPost = (post) => {
  router.push({
    path: `/Post/${post.objectID}`,
    state: { post },
  })
}

watch(() => route.query.search, fetchPosts)
watch(currentPage, fetchPosts)

onMounted(() => {
  fetchPosts()
})
</script>


<style>
.main {
  background-color: #f6f6ef;
}
.pagination-container {
  display: flex;
  justify-content: center;
}
</style>

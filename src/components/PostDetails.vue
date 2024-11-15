<template>
  <v-container class="mx-auto px-0 py-0 w-66">
    <v-card class="rounded-0 background">
      <v-card-title>{{ post?.title }}</v-card-title>
      <v-card-subtitle>
        {{ post?.points }} points | {{ post?.author }} | {{ formatDate(post?.created_at) }} |
        {{ post?.children?.length }} comments
      </v-card-subtitle>
      <v-card-text>
        <p v-html="post?.text"></p>
      </v-card-text>
    </v-card>

    <div v-if="displayedComments.length">
      <Comment
        v-for="comment in displayedComments"
        :key="comment.id"
        :comment="comment"
      />
    </div>

    <div class="load-more-container">
      <v-btn v-if="hasMoreComments" @click="loadMoreComments" class="load-more-button rounded-0 w-100">
        Load More Comments
      </v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Comment from '../components/Comment.vue'
import type { PostDetails } from '@/types/PostDetails';

const route = useRoute()
const post = ref<PostDetails | null>(null)
const commentsPerPage = 5
const currentPage = ref(1)
const displayedComments = ref([])

const fetchPostDetails = async () => {
  const postId = route.params.id
  try {
    const response = await axios.get(`http://hn.algolia.com/api/v1/items/${postId}`)
    const sortedComments = response.data.children.sort((a, b) => b.children.length - a.children.length)
    post.value = {
      ...response.data,
      children: sortedComments,
    }
    loadMoreComments()
  } catch (error) {
    console.error('Error fetching post details:', error)
  }
}

const loadMoreComments = () => {
  const start = (currentPage.value - 1) * commentsPerPage
  const end = start + commentsPerPage
  const nextBatch = post.value.children.slice(start, end)
  displayedComments.value.push(...nextBatch)
  currentPage.value++
}

const hasMoreComments = computed(() => {
  return post.value && displayedComments.value.length < post.value.children.length
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

onMounted(fetchPostDetails)
</script>

<style>
.background {
  background-color: #f6f6ef !important;
}

.load-more-container {
  display: flex;
  justify-content: center;
}

.load-more-button {
  background-color: #007BFF;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #f6f6ef !important;
}
</style>

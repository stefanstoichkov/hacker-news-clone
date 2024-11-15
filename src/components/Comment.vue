<template>
  <v-card
    class="rounded-0 background"
    :style="{ marginLeft: `${depth >= maxDepth ? 0 : depth * 20}px` }"
  >
    <v-card-subtitle>
      <v-btn variant="plain" size="x-small" icon @click="toggleCollapse">
        <v-icon size="large">{{ collapsed ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
      {{ comment.author }} | {{ formatDate(comment.created_at) }}
    </v-card-subtitle>
    <v-card-text v-html="comment.text" v-if="!collapsed"></v-card-text>

    <div v-if="!collapsed && comment.children">
      <Comment
        v-for="reply in comment.children"
        :key="reply.id"
        :comment="reply"
        :depth="depth + 1"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'
import type { Comment } from '../types/Comment';

const props = defineProps({
  comment: Comment,
  depth: { type: Number, default: 0 },
})

const collapsed = ref(false)
const maxDepth = 8

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.background {
  background-color: #f6f6ef;
}
</style>

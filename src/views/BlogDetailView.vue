<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPost } from '../utils/blogs'

const route = useRoute()
const router = useRouter()

const title = ref('')
const contentHtml = ref('')
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const id = String(route.params.id ?? '')
    if (!id) throw new Error('Missing blog id')
    const data = await fetchPost(id)
    title.value = data.title
    contentHtml.value = data.contentHtml
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Failed to load blog post'
  } finally {
    loading.value = false
  }
})

function goBack() {
  router.push({ name: 'blogs' })
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
    <button
      type="button"
      class="text-sm text-zinc-600 dark:text-zinc-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 hover:underline transition-colors mb-4"
      @click="goBack"
    >
      ← Back to Blogs
    </button>

    <div v-if="loading" class="text-zinc-600 dark:text-zinc-400">Loading…</div>
    <div v-else-if="error" class="text-red-600 dark:text-red-400">{{ error }}</div>
    <div v-else>
      <h1 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
        {{ title }}
      </h1>
      <div class="content" v-html="contentHtml" />
    </div>
  </div>
</template>

<style scoped>
.content img {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
}
</style>

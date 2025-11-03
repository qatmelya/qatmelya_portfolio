<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchManifest, paginate, fetchPost, extractExcerptFromHtml } from '../utils/blogs'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const error = ref<string | null>(null)
const totalPages = ref(1)
const page = ref(1)

type ListItem = { id: string; date: string; title: string; excerpt: string }
const listItems = ref<ListItem[]>([])

function getPageFromQuery() {
  const q = Number(route.query.page ?? 1)
  return Number.isFinite(q) && q > 0 ? Math.floor(q) : 1
}

async function load() {
  loading.value = true
  error.value = null
  try {
    const manifest = await fetchManifest()
    const { items, totalPages: tp, page: safe } = paginate(manifest, page.value)
    totalPages.value = tp
    page.value = safe
    const posts = await Promise.all(
      items.map(async (m) => {
        const post = await fetchPost(m.id)
        return {
          id: m.id,
          date: m.date,
          title: post.title,
          excerpt: extractExcerptFromHtml(post.contentHtml, 50),
        }
      }),
    )
    listItems.value = posts
  } catch (e: any) {
    error.value = e?.message ?? 'Failed to load blogs'
  } finally {
    loading.value = false
  }
}

function goToPage(p: number) {
  router.push({ name: 'blogs', query: { page: String(p) } })
}

onMounted(() => {
  page.value = getPageFromQuery()
  load()
})

watch(
  () => route.query.page,
  () => {
    page.value = getPageFromQuery()
    load()
  },
)

function openPost(id: string) {
  router.push({ name: 'blog-detail', params: { id } })
}

const canPrev = computed(() => page.value > 1)
const canNext = computed(() => page.value < totalPages.value)
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">Blogs</h1>

    <div v-if="loading" class="text-zinc-600 dark:text-zinc-400">Loading…</div>
    <div v-else-if="error" class="text-red-600 dark:text-red-400">{{ error }}</div>
    <div v-else>
      <div v-if="listItems.length === 0" class="text-zinc-600 dark:text-zinc-400">
        No posts yet.
      </div>

      <ul class="divide-y divide-zinc-200 dark:divide-zinc-800">
        <li
          v-for="item in listItems"
          :key="item.id"
          class="py-5 flex flex-col gap-1 cursor-pointer group"
          @click="openPost(item.id)"
        >
          <div class="flex items-baseline justify-between">
            <h2
              class="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors"
            >
              {{ item.title }}
            </h2>
            <time class="text-sm text-zinc-500 dark:text-zinc-400">{{
              new Date(item.date).toLocaleDateString()
            }}</time>
          </div>
          <p class="text-zinc-700 dark:text-zinc-300 line-clamp-3">{{ item.excerpt }}</p>
        </li>
      </ul>

      <div class="flex items-center justify-between mt-6">
        <button
          class="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 disabled:opacity-50"
          :disabled="!canPrev"
          @click.stop="goToPage(page - 1)"
        >
          ← Previous
        </button>
        <div class="text-sm text-zinc-600 dark:text-zinc-400">
          Page {{ page }} of {{ totalPages }}
        </div>
        <button
          class="px-3 py-1 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 disabled:opacity-50"
          :disabled="!canNext"
          @click.stop="goToPage(page + 1)"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

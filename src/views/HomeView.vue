<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProjectCarousel from '@/components/ProjectCarousel.vue'

type Project = {
  id: string
  title: string
  images?: string[]
  featuredImage?: string
}

type CarouselItem = { id: string; title: string; image: string }
const carouselItems = ref<CarouselItem[]>([])
const loadingProjects = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/projects.json', { cache: 'no-store' })
    const okJson = res.ok && (res.headers.get('content-type') || '').includes('application/json')
    if (!okJson) return
    const projects = (await res.json()) as Project[]
    const items = projects
      .map((p) => {
        const image = p.featuredImage || (p.images && p.images[0])
        if (!image) return null
        return { id: p.id, title: p.title, image }
      })
      .filter((x): x is CarouselItem => x !== null)
    carouselItems.value = items.slice(0, 8)
  } finally {
    loadingProjects.value = false
  }
})
</script>

<template>
  <main>
    <section id="greeting" class="text-center mt-24 mx-auto w-4xl">
      <h2 class="text-2xl">- Hi 👋</h2>
      <h1 class="text-6xl mt-2">
        I'm <u class="text-fuchsia-900 dark:text-fuchsia-300">Melisa</u>,
      </h1>
      <h1 class="text-4xl mt-4">
        - a Full-Stack Developer & Data Enthusiast building smart digital solutions.
      </h1>
      <p class="mt-8 text-xl">
        I create modern <u><i>web applications</i></u
        >, intelligent <u><i>data pipelines</i></u
        >, and <u><i>user-friendly</i></u> digital experiences. With a background in backend,
        frontend, and AI integration, I turn ideas into working solutions that help businesses grow.
      </p>
    </section>
    <section id="supporting-content" class="mt-16 px-4">
      <div class="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Recent Projects
          </h2>
          <div class="min-h-48">
            <ProjectCarousel v-if="!loadingProjects && carouselItems.length" :items="carouselItems" />
            <div v-else class="h-48 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          </div>
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Services</h2>
          <div class="h-48 rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
            Coming soon
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

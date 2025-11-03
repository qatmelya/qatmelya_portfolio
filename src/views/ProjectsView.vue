<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProjectCard, { type Project } from '@/components/ProjectCard.vue'
import ProjectModal from '@/components/ProjectModal.vue'
// switched to fetching from public/projects.json

const route = useRoute()
const router = useRouter()
const projects = ref<Project[]>([])
const loadError = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await fetch('/projects.json', { cache: 'no-store' })
    const contentType = res.headers.get('content-type') || ''
    if (!res.ok || !contentType.includes('application/json')) {
      throw new Error('Failed to load projects')
    }
    const data = (await res.json()) as Project[]
    projects.value = data
    // Open modal if project query is present
    const projectId = typeof route.query.project === 'string' ? route.query.project : null
    if (projectId) {
      const found = projects.value.find((p) => p.id === projectId) || null
      if (found) openModal(found)
    }
  } catch (e: any) {
    loadError.value = e?.message ?? 'Failed to load projects'
  }
})

// React to changes in ?project=<id>
watch(
  () => route.query.project,
  (val) => {
    const projectId = typeof val === 'string' ? val : null
    if (!projectId) return
    const found = projects.value.find((p) => p.id === projectId) || null
    if (found) openModal(found)
  }
)
const selectedProject = ref<Project | null>(null)
const isModalOpen = ref(false)

// Get filter from query parameter
const filter = computed(() => {
  const filterValue = route.query.filter
  return typeof filterValue === 'string' ? filterValue : null
})

// Filter projects based on technology (exact match)
const filteredProjects = computed(() => {
  if (!filter.value) {
    return projects.value
  }
  return projects.value.filter((project) =>
    project.technologies.some((tech) => tech === filter.value),
  )
})

function openModal(project: Project) {
  selectedProject.value = project
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  // Small delay before clearing project to allow transition
  setTimeout(() => {
    selectedProject.value = null
  }, 300)
  // Remove project query from URL
  const newQuery = { ...route.query }
  delete (newQuery as any).project
  router.replace({ query: newQuery })
}
</script>

<template>
  <main class="min-h-screen px-8 py-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Projects</h1>
        <p v-if="filter" class="text-lg text-zinc-700 dark:text-zinc-300">
          Filtered by:
          <span class="font-semibold text-fuchsia-600 dark:text-fuchsia-400">{{ filter }}</span>
          <RouterLink to="/projects" class="ml-4 text-zinc-600 dark:text-zinc-400 hover:underline">
            Clear filter
          </RouterLink>
        </p>
        <p v-else class="text-lg text-zinc-700 dark:text-zinc-300">
          {{ filteredProjects.length }} project{{ filteredProjects.length !== 1 ? 's' : '' }}
        </p>
      </div>

      <!-- Projects Grid -->
      <div
        v-if="filteredProjects.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          @click="openModal"
        />
      </div>

      <!-- No Projects Message -->
      <div v-else class="text-center py-12">
        <p class="text-xl text-zinc-600 dark:text-zinc-400">
          No projects found with the selected filter.
        </p>
        <RouterLink
          to="/projects"
          class="mt-4 inline-block text-fuchsia-600 dark:text-fuchsia-400 hover:underline"
        >
          View all projects
        </RouterLink>
      </div>
    </div>

    <!-- Project Modal -->
    <ProjectModal :project="selectedProject" :is-open="isModalOpen" @close="closeModal" />
  </main>
</template>

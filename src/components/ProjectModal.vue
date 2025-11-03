<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import PhotoCarousel from './PhotoCarousel.vue'
import type { Project } from './ProjectCard.vue'

const props = defineProps<{
  project: Project | null
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

function closeModal() {
  emit('close')
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

function handleBackdropClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
  if (props.isOpen) {
    document.body.style.overflow = 'hidden'
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})

const hasLinks = computed(() => {
  return !!(props.project?.githubUrl || props.project?.websiteUrl)
})
</script>

<template>
  <Transition name="modal">
    <div
      v-if="isOpen && project"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      @click="handleBackdropClick"
    >
      <div
        class="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Header -->
        <div
          class="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 px-6 py-4 flex justify-between items-center z-10"
        >
          <h2 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100">{{ project.title }}</h2>
          <button
            @click="closeModal"
            class="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            aria-label="Close modal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- Photo Carousel -->
          <PhotoCarousel
            :images="project.images.length > 0 ? project.images : [project.featuredImage]"
          />

          <!-- Description -->
          <div>
            <h3 class="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">Description</h3>
            <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <!-- Technologies -->
          <div>
            <h3 class="text-xl font-semibold mb-3 text-zinc-900 dark:text-zinc-100">
              Technologies
            </h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-3 py-1.5 text-sm bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-800 dark:text-fuchsia-200 rounded-full"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Links -->
          <div v-if="hasLinks" class="flex gap-4">
            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
              View on GitHub
            </a>
            <a
              v-if="project.websiteUrl"
              :href="project.websiteUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center px-4 py-2 bg-fuchsia-600 dark:bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-700 dark:hover:bg-fuchsia-600 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Visit Website
            </a>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
  opacity: 0;
}
</style>

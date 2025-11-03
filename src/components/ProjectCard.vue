<script setup lang="ts">
export interface Project {
  id: string
  title: string
  shortDescription: string
  description: string
  technologies: string[]
  images: string[]
  githubUrl?: string
  websiteUrl?: string
  featuredImage: string
}

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits<{
  click: [project: Project]
}>()

function handleClick() {
  emit('click', props.project)
}
</script>

<template>
  <div
    @click="handleClick"
    class="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
  >
    <!-- Featured Image -->
    <div class="w-full h-48 bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
      <img
        :src="project.featuredImage"
        :alt="project.title"
        class="w-full h-full object-cover"
        @error="
          (e) => {
            ;(e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect fill=\'%23ddd\' width=\'400\' height=\'300\'/%3E%3Ctext fill=\'%23999\' font-family=\'sans-serif\' font-size=\'18\' dy=\'10.5\' font-weight=\'bold\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\'%3ENo Image%3C/text%3E%3C/svg%3E'
          }
        "
      />
    </div>

    <!-- Content -->
    <div class="p-4">
      <h3 class="text-xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">{{ project.title }}</h3>
      <p class="text-zinc-700 dark:text-zinc-300 mb-3 line-clamp-2">
        {{ project.shortDescription }}
      </p>

      <!-- Technology Pills -->
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="px-2 py-1 text-xs bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-800 dark:text-fuchsia-200 rounded-full"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

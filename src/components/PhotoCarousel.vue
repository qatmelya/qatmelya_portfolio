<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  images: string[]
}>()

const currentIndex = ref(0)

const currentImage = computed(() => props.images[currentIndex.value] || '')

const hasMultipleImages = computed(() => props.images.length > 1)

function nextImage() {
  if (hasMultipleImages.value) {
    currentIndex.value = (currentIndex.value + 1) % props.images.length
  }
}

function previousImage() {
  if (hasMultipleImages.value) {
    currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
  }
}

function goToImage(index: number) {
  currentIndex.value = index
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    previousImage()
  } else if (event.key === 'ArrowRight') {
    nextImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="relative w-full h-full">
    <div class="relative w-full h-96 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden">
      <img
        :src="currentImage"
        :alt="`Project image ${currentIndex + 1}`"
        class="w-full h-full object-cover"
        @error="
          (e) => {
            ;(e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect fill=\'%23ddd\' width=\'400\' height=\'300\'/%3E%3Ctext fill=\'%23999\' font-family=\'sans-serif\' font-size=\'18\' dy=\'10.5\' font-weight=\'bold\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\'%3ENo Image%3C/text%3E%3C/svg%3E'
          }
        "
      />

      <!-- Navigation arrows -->
      <button
        v-if="hasMultipleImages"
        @click="previousImage"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
        aria-label="Previous image"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        v-if="hasMultipleImages"
        @click="nextImage"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
        aria-label="Next image"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Dot indicators -->
    <div v-if="hasMultipleImages" class="flex justify-center gap-2 mt-4">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="goToImage(index)"
        :class="[
          'w-3 h-3 rounded-full transition-all',
          index === currentIndex
            ? 'bg-fuchsia-600 dark:bg-fuchsia-400'
            : 'bg-zinc-400 dark:bg-zinc-600 hover:bg-zinc-500 dark:hover:bg-zinc-500',
        ]"
        :aria-label="`Go to image ${index + 1}`"
      />
    </div>
  </div>
</template>

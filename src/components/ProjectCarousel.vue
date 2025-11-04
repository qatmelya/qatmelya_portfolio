<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

type Item = { id: string; title: string; image: string }

const props = defineProps<{
  items: Item[]
}>()

const router = useRouter()
const currentIndex = ref(0)

const currentItem = computed(() => props.items[currentIndex.value])
const hasMultiple = computed(() => props.items.length > 1)

function next() {
  if (hasMultiple.value) currentIndex.value = (currentIndex.value + 1) % props.items.length
}

function prev() {
  if (hasMultiple.value)
    currentIndex.value = currentIndex.value === 0 ? props.items.length - 1 : currentIndex.value - 1
}

function goTo(index: number) {
  currentIndex.value = index
}

function openProject() {
  const item = currentItem.value
  if (!item) return
  router.push({ name: 'projects', query: { project: item.id } })
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') prev()
  else if (event.key === 'ArrowRight') next()
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
        :src="currentItem?.image || ''"
        :alt="currentItem?.title || 'Project image'"
        class="w-full h-full object-cover cursor-pointer"
        @click="openProject"
        @error="
          (e) => {
            ;(e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'300\'%3E%3Crect fill=\'%23ddd\' width=\'400\' height=\'300\'/%3E%3Ctext fill=\'%23999\' font-family=\'sans-serif\' font-size=\'18\' dy=\'10.5\' font-weight=\'bold\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\'%3ENo Image%3C/text%3E%3C/svg%3E'
          }
        "
      />

      <!-- Title overlay: full-width background equal to text height for readability -->
      <div
        class="absolute left-0 bottom-0 w-full bg-black/70 backdrop-blur-sm text-white px-4 py-3"
      >
        <div class="text-sm uppercase tracking-wide opacity-80">Project</div>
        <div class="text-lg font-semibold truncate">{{ currentItem?.title }}</div>
      </div>

      <!-- Navigation arrows -->
      <button
        v-if="hasMultiple"
        @click="prev"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
        aria-label="Previous"
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
        v-if="hasMultiple"
        @click="next"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
        aria-label="Next"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- Dots -->
    <div v-if="hasMultiple" class="flex justify-center gap-2 mt-4">
      <button
        v-for="(it, idx) in props.items"
        :key="it.id"
        @click="goTo(idx)"
        :class="[
          'w-3 h-3 rounded-full transition-all',
          idx === currentIndex
            ? 'bg-fuchsia-600 dark:bg-fuchsia-400'
            : 'bg-zinc-400 dark:bg-zinc-600 hover:bg-zinc-500 dark:hover:bg-zinc-500',
        ]"
        :aria-label="`Go to ${it.title}`"
      />
    </div>
  </div>
</template>

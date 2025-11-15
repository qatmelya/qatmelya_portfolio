<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'navbar',
  setup() {
    const router = useRouter()
    const isMenuOpen = ref(false)
    const shouldShake = ref(false)
    let shakeInterval: number | null = null

    const pages = ref([
      { to: '/', text: 'Home' },
      { to: '/about', text: 'About' },
      { to: '/services', text: 'Services' },
      { to: '/projects', text: 'Projects' },
      { to: '/blogs', text: 'Blogs' },
    ])

    function toggleMenu() {
      isMenuOpen.value = !isMenuOpen.value
      if (isMenuOpen.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    function closeMenu() {
      isMenuOpen.value = false
      document.body.style.overflow = ''
    }

    function handleNavClick(to: string) {
      closeMenu()
      router.push(to)
    }

    function triggerShake() {
      shouldShake.value = true
      setTimeout(() => {
        shouldShake.value = false
      }, 500)
    }

    onMounted(() => {
      shakeInterval = window.setInterval(triggerShake, 5000)
    })

    onUnmounted(() => {
      if (shakeInterval !== null) {
        clearInterval(shakeInterval)
      }
    })

    return { pages, isMenuOpen, shouldShake, toggleMenu, closeMenu, handleNavClick }
  },
}
</script>

<template>
  <nav
    class="flex max-w-full min-w-full text-center my-4 px-4 md:px-8 pb-4 shadow-lg dark:shadow-zinc-800 dark:shadow-md relative z-50 bg-rose-50 dark:bg-zinc-900"
  >
    <!-- Desktop Layout -->
    <RouterLink
      v-bind:to="pages[0].to"
      class="text-2xl md:text-4xl mt-auto me-auto hidden md:block"
    >
      Melisa
    </RouterLink>
    <ul class="hidden md:flex">
      <template v-for="(page, index) in pages" v-bind:key="index">
        <RouterLink
          v-bind:to="page.to"
          class="mx-2 mt-auto text-xl hover:scale-115 transform transition duration-300"
        >
          {{ page.text }}
        </RouterLink>
        <p v-if="index != pages.length - 1" class="mx-2 mt-auto text-xl select-none">|</p>
      </template>
    </ul>
    <button
      :class="[
        'hidden md:block bg-fuchsia-300 dark:bg-fuchsia-900 border-2 rounded-2xl px-4 py-1 mt-auto ms-auto text-xl hover:scale-110 transform transition duration-300 text-nowrap',
        { 'animate-shake': shouldShake },
      ]"
    >
      Contact Me
    </button>

    <!-- Mobile Layout -->
    <RouterLink
      v-bind:to="pages[0].to"
      class="text-2xl md:text-4xl mt-auto me-auto md:hidden"
      @click="closeMenu"
    >
      Melisa
    </RouterLink>
    <button
      @click="toggleMenu"
      class="md:hidden mt-auto ms-auto p-2 focus:outline-none"
      aria-label="Toggle menu"
    >
      <svg v-if="!isMenuOpen" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Mobile Full-Screen Overlay -->
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-rose-50 dark:bg-zinc-900 z-50 flex flex-col items-center justify-center md:hidden"
    >
      <!-- Close Button (X) -->
      <button
        @click="closeMenu"
        class="absolute top-4 right-4 p-2 focus:outline-none"
        aria-label="Close menu"
      >
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div class="flex flex-col items-center space-y-6 text-center w-full px-4">
        <template v-for="(page, index) in pages" v-bind:key="index">
          <button
            @click="handleNavClick(page.to)"
            class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transform transition duration-300"
          >
            {{ page.text }}
          </button>
          <div
            v-if="index != pages.length - 1"
            class="w-32 h-px bg-zinc-300 dark:bg-zinc-700 select-none"
          ></div>
        </template>
      </div>
    </div>

    <!-- Mobile Contact Me Button (Fixed Bottom Right) -->
    <button
      v-if="!isMenuOpen"
      :class="[
        'md:hidden fixed bottom-6 right-6 bg-fuchsia-300 dark:bg-fuchsia-900 border-2 rounded-2xl px-6 py-3 text-lg hover:scale-110 transform transition duration-300 shadow-lg z-40',
        { 'animate-shake': shouldShake },
      ]"
    >
      Contact Me
    </button>
  </nav>
</template>

<style scoped>
@keyframes shake {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-1.5px, 1px);
  }
  50% {
    transform: translate(1.5px, -1px);
  }
  75% {
    transform: translate(-1px, 0.5px);
  }
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>

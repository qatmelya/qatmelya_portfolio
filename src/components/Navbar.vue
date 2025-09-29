<script lang="ts">
import { ref } from 'vue'
export default {
    name: 'navbar',
    setup() {
        const pages = ref([
            { to: '/', text: 'Home' },
            { to: '/about', text: 'About' },
            { to: '/services', text: 'Services' },
            { to: '/projects', text: 'Projects' },
            { to: '/blogs', text: 'Blogs' },
        ])

        return { pages }
    },
}
</script>

<template>
    <nav class="flex max-w-full min-w-full text-center my-4 px-8 pb-4 shadow-lg dark:shadow-zinc-800 dark:shadow-md">
        <RouterLink v-bind:to="pages[0].to" class="text-4xl mt-auto me-auto"> Melisa </RouterLink>
        <ul class="flex">
            <template v-for="(page, index) in pages">
                <RouterLink v-bind:to="page.to"
                    class="mx-2 mt-auto text-xl hover:scale-115 transform transition duration-300">
                    {{ page.text }}
                </RouterLink>
                <p v-if="index != pages.length - 1" class="mx-2 mt-auto text-xl">|</p>
            </template>
        </ul>
        <button
            class="bg-fuchsia-300 dark:bg-fuchsia-900 border-2 rounded-2xl px-4 py-1 mt-auto ms-auto text-xl hover:scale-110 transform transition duration-300 text-nowrap">
            Contact Me
        </button>
    </nav>
</template>

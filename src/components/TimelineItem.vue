<script setup lang="ts">
import type { ITimelineItem } from '@/types/TimelineItem'
import LinkButton from './LinkButton.vue'
defineProps<ITimelineItem>()
</script>

<template>
  <li class="mb-10 ms-4 snap-start">
    <div
      class="absolute w-3 h-3 dark:bg-zinc-400 rounded-full mt-1.5 -start-1.5 border dark:border-white border-zinc-700 bg-zinc-700"
    ></div>
    <time class="mb-1 text-md font-normal leading-none text-zinc-700 dark:text-zinc-300">{{
      date_text
    }}</time>
    <h3 class="text-2xl font-semibold">{{ title }}</h3>
    <p class="text-lg font-normal text-zinc-700 dark:text-zinc-300" v-if="description">
      {{ description }}
    </p>
    <template v-if="link && link_text">
      <LinkButton
        class="text-sm mt-2"
        v-bind:link="link"
        v-bind:link_text="link_text"
        v-bind:link_external="link_external"
      >
      </LinkButton>
    </template>
  </li>
</template>

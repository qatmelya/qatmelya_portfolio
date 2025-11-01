<script setup lang="ts">
import type { ITimelineItem } from '@/types/TimelineItem'
import TimelineItem from './TimelineItem.vue'
defineProps<{
  timelineData: Array<ITimelineItem>
}>()
</script>

<template>
  <div class="flex flex-col overflow-hidden h-[90vh]">
    <div class="overflow-auto ps-5 pe-10 scroll-smooth snap-y">
      <ol class="relative border-s-2 border-zinc-700 dark:border-zinc-400">
        <TimelineItem
          v-for="timelineItem in timelineData"
          v-bind:key="timelineItem.title"
          v-bind:date_text="timelineItem.date_text"
          v-bind:title="timelineItem.title"
          v-bind:description="timelineItem.description"
          v-bind:link="timelineItem.link"
          v-bind:link_text="timelineItem.link_text"
          v-bind:link_external="timelineItem.link_external"
        />
      </ol>
      <p class="h-[20vh]"></p>
    </div>
  </div>
</template>

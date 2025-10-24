<script setup lang="ts">
import Timeline from '@/components/Timeline.vue';
import backgroundTimeline from '@/assets/backgroundTimeline.json'
</script>

<template>
  <div class="grid grid-cols-2">
    <main id="about" class="px-8 mx-2 mt-12 col-end-0">
      <section id="who-are-you" class="py-4 border-b-2  border-zinc-700 dark:border-zinc-400 px-4">
        <h1 class="text-4xl italic">Who are you?</h1>
        <p class="text-xl indent-10 mt-2 text-zinc-700 dark:text-zinc-300">
          I'm a developer with expertise in full-stack web apps, backend systems,
          and AI-powered tools. I enjoy solving problems where technology meets real-world impact.
        </p>
      </section>
      <section id="background" class="py-4 border-b-2  border-zinc-700 dark:border-zinc-400 px-4">
        <h1 class="text-4xl italic">What skills do you have?</h1>
        <p class="text-xl indent-10 mt-2 text-zinc-700 dark:text-zinc-300">
          From designing premium calculation engines in Java with Spring, to
          building
          smart home systems with IoT and AI, I've developed a wide range of skills across software development, machine
          learning, and data analysis.
        </p>
      </section>
      <section id="personal" class="py-4 px-4">
        <h1 class="text-4xl italic">Tell us more about yourself,</h1>
        <p class="text-xl indent-10 mt-2 text-zinc-700 dark:text-zinc-300">
          When I'm not coding, I love exploring design, learning languages,
          and working on creative projects that challenge me to grow.
        </p>
      </section>
    </main>

    <aside>
      <Timeline v-bind:timelineData="backgroundTimeline" />
    </aside>
  </div>
</template>

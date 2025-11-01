<script setup lang="ts">
import Timeline from '@/components/Timeline.vue'
import backgroundTimeline from '@/assets/backgroundTimeline.json'
</script>

<template>
  <div class="grid grid-cols-2">
    <main id="about" class="flex flex-col overflow-scroll h-[90vh] px-8 mx-2 mt-6 col-end-0">
      <section id="about-me" class="py-4 border-b-2 border-zinc-700 dark:border-zinc-400 px-4">
        <h1 class="text-4xl font-bold">About Me</h1>
        <div class="text-lg mt-2 text-zinc-700 dark:text-zinc-300">
          <p class="indent-10">
            I'm a <span class="font-semibold">Full-Stack Developer and Data Scientist</span> with a
            strong background in
            <span class="font-semibold"
              >AI integration, backend engineering, and data-driven systems.</span
            >
          </p>
          <p class="indent-10">
            I specialize in turning technical research and real-world requirements into scalable,
            production-ready solutions. My experience spans from developing industrial applications
            in Java and Spring Boot to building data pipelines, deep learning models, and
            intelligent web platforms.
          </p>
          <br />
          <p class="indent-10">
            I graduated with a
            <span class="font-semibold"
              >Bachelor's degree in Computer Engineering from Galatasaray University</span
            >, where I combined analytical problem-solving with practical implementation across
            software, data, and AI domains. My thesis focused on extracting sEKV model parameters of
            transistor devices using deep learning, which deepened my interest in combining machine
            learning with engineering systems.
          </p>
        </div>
      </section>
      <section
        id="career-focus"
        class="py-4 mb-20 border-b-2 border-zinc-700 dark:border-zinc-400 px-4"
      >
        <h1 class="text-4xl font-bold">Career Focus</h1>
        <div class="text-lg mt-2 text-zinc-700 dark:text-zinc-300">
          <p class="indent-10">
            I'm passionate about
            <span class="font-semibold">
              building intelligent, efficient, and scalable systems
            </span>
            that merge research, engineering, and user needs.
          </p>
          <p class="indent-10">
            Whether developing robust backends, designing data pipelines, or applying AI to solve
            complex problems, I aim to deliver technology that is both functional and meaningful.
          </p>
          <p class="indent-10">
            I'm currently seeking opportunities where I can contribute to
            <span class="font-semibold"> innovative data-driven projects </span>
            , collaborate in
            <span class="font-semibold"> cross-functional teams </span>
            , and continue growing as a software engineer and data professional.
          </p>
        </div>
      </section>
    </main>

    <aside>
      <Timeline v-bind:timelineData="backgroundTimeline" />
    </aside>
  </div>
</template>

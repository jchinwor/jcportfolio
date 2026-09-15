<template>
  <section id="services" class="scroll-mt-20 py-20 lg:py-24">
    <div class="mx-auto max-w-[1200px] px-4 sm:px-6">
      <SectionHeader
        title="What I do"
        subtitle="End-to-end solutions, from concept and design to deployment and growth."
      />

      <!-- Lighter band panel holding a 4-cell bento with rhythm: wide + narrow, then narrow + wide. -->
      <div class="mt-12 rounded-panel border border-edge bg-band p-3 sm:p-4">
        <div class="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-6">
          <article
            v-for="(service, i) in services"
            :key="service.id"
            class="group relative flex flex-col overflow-hidden rounded-card border border-edge bg-card p-6 transition-colors duration-300 hover:border-edge-strong md:p-7"
            :class="spanClass(i)"
            data-aos="fade-up"
            :data-aos-delay="i * 70"
          >
            <!-- Aurora wash on the two wide cells so the grid is not four identical white boxes -->
            <div
              v-if="isWide(i)"
              aria-hidden="true"
              class="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
              :class="i === 0 ? 'bg-accent' : 'bg-accent-2'"
            ></div>

            <div class="relative flex items-start justify-between">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-edge bg-band text-muted transition-colors duration-300 group-hover:text-ink">
                <Icon :icon="service.icon" class="text-2xl" aria-hidden="true" />
              </span>
              <span class="font-display text-sm font-medium text-faint">{{ String(service.id).padStart(2, "0") }}</span>
            </div>

            <h3 class="relative mt-8 font-display text-xl font-semibold tracking-[-0.01em] text-ink">
              {{ service.name }}
            </h3>
            <p class="relative mt-2.5 text-sm leading-relaxed text-muted" :class="isWide(i) ? 'max-w-[46ch]' : ''">
              {{ service.description }}
            </p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "./UI/SectionHeader.vue";

// Cells 0 and 3 are wide; 1 and 2 are narrow. Reads as wide+narrow / narrow+wide.
const isWide = (i) => i === 0 || i === 3;
const spanClass = (i) => (isWide(i) ? "md:col-span-4" : "md:col-span-2");

const services = [
  {
    id: 1,
    icon: "tabler:world",
    name: "Web Development",
    description:
      "Fast, responsive, and scalable websites built with modern technologies, crafted for performance and seamless user experiences.",
  },
  {
    id: 2,
    icon: "tabler:device-mobile",
    name: "App Development",
    description:
      "High-performance web and mobile apps with intuitive UI, smooth functionality, and scalable architecture that bring ideas to life.",
  },
  {
    id: 3,
    icon: "tabler:trending-up",
    name: "Digital Marketing",
    description:
      "Amplify your brand's reach with SEO, social media strategy, and data-driven campaigns designed to drive traffic and conversions.",
  },
  {
    id: 4,
    icon: "tabler:pencil",
    name: "UI/UX Design",
    description:
      "User-friendly, visually compelling interfaces designed in Figma, balancing aesthetics with usability to maximize engagement.",
  },
];
</script>

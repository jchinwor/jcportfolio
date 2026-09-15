<template>
  <section id="skills" class="scroll-mt-20 py-20 lg:py-24">
    <div class="mx-auto max-w-[1200px] px-4 sm:px-6">
      <SectionHeader
        title="Technologies and tools"
        subtitle="The stack I reach for to design, build, and ship."
      />
    </div>

    <!-- One marquee on the page: a hairline rail with faded edges. -->
    <div class="mt-12 border-y border-edge bg-band/40 py-8">
      <div class="mask-fade-x mx-auto max-w-[1200px]">
        <Swiper
          :modules="[Autoplay]"
          :loop="true"
          :speed="6000"
          :autoplay="autoplay"
          :allowTouchMove="true"
          :breakpoints="breakpoints"
          class="px-4"
        >
          <SwiperSlide v-for="tool in tools" :key="tool.name">
            <div class="group flex flex-col items-center justify-center gap-3 py-2">
              <div class="flex h-16 w-16 items-center justify-center rounded-card border border-edge bg-card transition-colors duration-300 group-hover:border-edge-strong">
                <img
                  :src="tool.logo"
                  :alt="tool.name"
                  loading="lazy"
                  class="h-9 w-9 object-contain grayscale opacity-90 transition-[filter,opacity] duration-300 group-hover:grayscale-0 group-hover:opacity-100 dark:brightness-125 dark:group-hover:brightness-100"
                />
              </div>
              <span class="text-xs font-medium text-muted transition-colors duration-300 group-hover:text-ink">
                {{ tool.name }}
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "./UI/SectionHeader.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Under reduced motion the rail is still swipeable, just not self-scrolling.
const autoplay = reduceMotion
  ? false
  : { delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true };

const tools = [
  { name: "Vue.js", logo: "/logos/vuejs.png" },
  { name: "React.js", logo: "/logos/reactjs.png" },
  { name: "Nuxt.js", logo: "/logos/nuxtjs.png" },
  { name: "Quasar", logo: "/logos/Quasar.png" },
  { name: "Tailwind CSS", logo: "/logos/tailwindcss.png" },
  { name: "JavaScript", logo: "/logos/javascript.png" },
  { name: "Figma", logo: "/logos/figma.png" },
  { name: "Firebase", logo: "/logos/firebase.png" },
  { name: "MongoDB", logo: "/logos/mongodb.png" },
  { name: "PostgreSQL", logo: "/logos/postgresql.png" },
  { name: "MySQL", logo: "/logos/mysql.png" },
  { name: "React Native", logo: "https://cdn.simpleicons.org/reactnative/61DAFB" },
  { name: "Laravel", logo: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "WordPress", logo: "/logos/wordpress.png" },
  { name: "Git", logo: "/logos/git.png" },
  { name: "Photoshop", logo: "/logos/photoshop.png" },
  { name: "Illustrator", logo: "/logos/illustrator.png" },
];

const breakpoints = {
  320: { slidesPerView: 3, spaceBetween: 16 },
  640: { slidesPerView: 4, spaceBetween: 24 },
  1024: { slidesPerView: 6, spaceBetween: 32 },
  1280: { slidesPerView: 8, spaceBetween: 40 },
};
</script>

<style scoped>
:deep(.swiper-wrapper) {
  transition-timing-function: linear !important;
}
</style>

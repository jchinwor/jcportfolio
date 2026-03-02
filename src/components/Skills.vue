<template>
  <section class="mt-32" id="skills">
    <SectionHeader title="Technologies & Tools" />

    <div class="mt-20">
      <Swiper
        :modules="[Autoplay]"
        :loop="true"
        :speed="6000"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }"
        :breakpoints="breakpoints"
        class="max-w-6xl mx-auto px-4"
      >
        <SwiperSlide
          v-for="(tool, index) in tools"
          :key="index"
        >
          <div
            class="flex flex-col items-center justify-center
                    hover:opacity-100
                   transition-all duration-300"
          >
            <img
              :src="tool.logo"
              :alt="tool.name"
              class="h-14 w-auto object-contain
                      hover:grayscale-0"
            />
            <span class="mt-3 text-xs tracking-wide text-gray-600 dark:text-gray-400">
              {{ tool.name }}
            </span>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>


<script setup>
import SectionHeader from "./UI/SectionHeader.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";

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
  { name: "Postgresql", logo: "/logos/postgresql.png" },
  { name: "Mysql", logo: "/logos/mysql.png" },
  { name: "React Native", logo: "https://cdn.simpleicons.org/reactnative/61DAFB" },
  { name: "Laravel", logo: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "WordPress", logo: "/logos/wordpress.png" },
  { name: "Git", logo: "/logos/git.png" },
  { name: "Photoshop", logo: "/logos/photoshop.png" },
  { name: "Illustrator", logo: "/logos/illustrator.png" }
];

const breakpoints = {
  320: { slidesPerView: 2, spaceBetween: 24 },
  640: { slidesPerView: 3, spaceBetween: 32 },
  1024: { slidesPerView: 5, spaceBetween: 40 },
  1280: { slidesPerView: 6, spaceBetween: 48 }
};
</script>


<style scoped>
/* Smooth infinite auto-scroll */
.swiper-wrapper {
  transition-timing-function: linear !important;
}
</style>


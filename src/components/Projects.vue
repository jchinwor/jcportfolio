<template>
  <section class="mt-32 relative px-4 md:px-8 lg:px-16 mx-auto w-full max-w-7xl" id="projects">
    <SectionHeader title="Projects" />

    <!-- Category Filter Tabs -->
    <div class="mt-12 flex flex-wrap justify-center gap-3" data-aos="fade-up">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="activeCategory = cat"
        class="px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
        :class="
          activeCategory === cat
            ? 'bg-primary dark:bg-secondary text-white dark:text-primary border-primary dark:border-secondary scale-105'
            : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-secondary hover:text-secondary dark:hover:text-secondary'
        "
      >
        {{ cat }}
      </button>
    </div>

    <!-- Custom Navigation Buttons -->
    <button
      class="swiper-prev absolute top-2/3 left-0 transform -translate-y-1/2 z-10 text-white dark:bg-secondary bg-primary p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      aria-label="Previous project"
    >
      <Icon icon="line-md:arrow-left" class="font-bold text-2xl" />
    </button>
    <button
      class="swiper-next absolute top-2/3 right-0 transform -translate-y-1/2 z-10 text-white dark:bg-secondary bg-primary p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      aria-label="Next project"
    >
      <Icon icon="line-md:arrow-right" class="font-bold text-2xl" />
    </button>

    <!-- Swiper Component -->
    <swiper
      :effect="'coverflow'"
      grabCursor
      centeredSlides
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 45,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :navigation="navigationOptions"
      loop
      pagination
      :modules="[EffectCoverflow, Navigation]"
      class="max-w-full mt-10"
    >
      <swiper-slide
        class="max-w-[380px]"
        v-for="(project, index) in filteredProjects"
        :key="index"
      >
        <ProjectCard
          :title="project.title"
          :description="project.description"
          :image="project.image"
          :tags="project.tags"
          :liveLink="project.liveLink"
          :codeLink="project.codeLink"
        />
      </swiper-slide>
    </swiper>

    <!-- Empty state -->
    <p
      v-if="filteredProjects.length === 0"
      class="text-center text-gray-500 dark:text-gray-400 mt-16 py-12"
    >
      No projects in this category yet.
    </p>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import SectionHeader from "./UI/SectionHeader.vue";
import ProjectCard from "./UI/ProjectCard.vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Navigation } from "swiper/modules";

import jagma from "@/assets/jagma.png";
import ageunited from "@/assets/ageunited.png";
import jcstore from "@/assets/jcstore.png";
import agci from "@/assets/agci.png";
import deejak from "@/assets/deejak.png";
import ghanaeats from "@/assets/ghanaeats.png";
import emechanic from "@/assets/emechanic.png";
import shopwithyem2 from "@/assets/shopwithyem2.png";
import uclone from "@/assets/uclone.png";
import goodluckafricaui from "@/assets/goodluckafricaui.png";

const categories = ["All", "Web", "App", "Design"];
const activeCategory = ref("All");

const navigationOptions = {
  prevEl: ".swiper-prev",
  nextEl: ".swiper-next",
};

const projects = ref([
  {
    title: "Jagma Medical Foundation",
    description: "An NGO website raising awareness and providing medical aid resources for tuberculosis patients across Ghana.",
    image: jagma,
    tags: ["WordPress", "PHP"],
    category: "Web",
    liveLink: "javascript:void(0)",
    codeLink: null,
  },
  {
    title: "Ghana Eats",
    description: "A full-stack food delivery platform connecting users with local restaurants for convenient meal ordering and real-time delivery tracking.",
    image: ghanaeats,
    tags: ["Quasar", "Vue", "MongoDB", "ExpressJS", "NodeJS", "OAuth"],
    category: "Web",
    liveLink: "https://ghanaeat.onrender.com/",
    codeLink: null,
  },
  {
    title: "Age United Travel",
    description: "A travel and tour website for a leading Ghanaian travel firm, featuring destination showcases, tour packages, and booking inquiry flows.",
    image: ageunited,
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Web",
    liveLink: "https://ageunitedtravel.com/",
    codeLink: null,
  },
  {
    title: "DEEJAK LTD",
    description: "Corporate website for a proudly Ghanaian agro-processing company committed to transforming locally sourced ingredients into premium organic products.",
    image: deejak,
    tags: ["HTML5", "CSS3", "JavaScript"],
    category: "Web",
    liveLink: "https://deejak.com/index",
    codeLink: null,
  },
  {
    title: "JC Store",
    description: "A full-stack e-commerce platform with product listings, cart management, user authentication, and streamlined order processing.",
    image: jcstore,
    tags: ["Vue.js", "MongoDB", "ExpressJS"],
    category: "Web",
    liveLink: "https://jc-shop.onrender.com/",
    codeLink: null,
  },
  {
    title: "Age Green Campaign Initiative",
    description: "Website for an NGO pioneering cleaner, greener, and healthier environments through community-driven campaigns and eco-friendly initiatives.",
    image: agci,
    tags: ["HTML", "CSS", "JavaScript"],
    category: "Web",
    liveLink: "https://www.agcinitiative.org/",
    codeLink: null,
  },
  {
    title: "E-Mechanic",
    description: "A mobile web app connecting car owners with the nearest available mechanic in real-time during roadside emergencies.",
    image: emechanic,
    tags: ["HTML", "CSS", "JavaScript", "PHP"],
    category: "App",
    liveLink: null,
    codeLink: null,
  },
  {
    title: "ShopWithYEM",
    description: "A global marketplace for unique and creative products, integrated with the YEM cryptocurrency payment system for seamless transactions.",
    image: shopwithyem2,
    tags: ["WordPress", "PHP", "JavaScript"],
    category: "Web",
    liveLink: "https://shopwithyem.com/",
    codeLink: null,
  },
  {
    title: "Uber Clone",
    description: "A Progressive Web App ride-sharing clone with map integration, driver-rider matching, and real-time location tracking.",
    image: uclone,
    tags: ["Vue.js", "ExpressJS", "PWA"],
    category: "App",
    liveLink: "https://jc-uberclone.onrender.com/",
    codeLink: null,
  },
  {
    title: "Goodluck Africa UI",
    description: "A high-fidelity UI/UX design prototype for Goodluck Africa's digital platform, crafted in Figma with a clean and modern interface.",
    image: goodluckafricaui,
    tags: ["Figma"],
    category: "Design",
    liveLink: "https://www.figma.com/proto/6injL4VGY371Ya2BWt312a/Goodluck-Africa-UI?node-id=7-2&starting-point-node-id=7%3A2",
    codeLink: null,
  },
]);

const filteredProjects = computed(() => {
  if (activeCategory.value === "All") return projects.value;
  return projects.value.filter((p) => p.category === activeCategory.value);
});
</script>

<style>
.swiper-prev,
.swiper-next {
  cursor: pointer;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

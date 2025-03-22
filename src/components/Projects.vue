<template>
  <section class="mt-32 relative w-11/12 px-16 mx-auto" id="projects">
    <SectionHeader title="Projects" />
    <!-- custom Navigation Button -->
    <button
      class="swiper-prev absolute top-2/3 left-4 transform -translate-y-1/2 z-10 text-white dark:bg-secondary bg-primary p-4 rounded-full"
    >
      <Icon icon="line-md:arrow-left" class="font-bold text-3xl" />
    </button>
    <button
      class="swiper-next absolute top-2/3 right-4 transform -translate-y-1/2 z-10 text-white dark:bg-secondary bg-primary p-4 rounded-full"
    >
      <Icon icon="line-md:arrow-right" class="font-bold text-3xl" />
    </button>

    <!--- Swiper Component -->
    <swiper
      :effect="'coverflow'"
      grabCursor
      centeredSlides
      :slidesPerView="'auto'"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :navigation="navigationOptions"
      loop
      pagination
      :modules="[EffectCoverflow, Navigation]"
      class="max-w-full mt-32"
    >
      <swiper-slide
        class="max-w-[400px]"
        v-for="(project, index) in projects"
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
  </section>
</template>

<script setup>
import SectionHeader from "./UI/SectionHeader.vue";
import ProjectCard from "./UI/ProjectCard.vue";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectCoverflow, Navigation } from "swiper/modules";
import { ref } from "vue";

import jagma from "@/assets/jagma.png";

//Define Navigation Options
const navigationOptions = {
  prevEl: ".swiper-prev",
  nextEl: ".swiper-next",
};

const projects = ref([
  {
    title: "Jagma Medical Foundation",
    description: "An NGO specialized in creating awareness and rendering medical aids for tuberculosis patients",
    image: jagma,
    tags: ["WORDPRESS", "PHP",],
    liveLink: "javascript:void(0)",
    codeLink: "/",
  },
  {
    title: "Age United Travel",
    description: "Designed and developed Age United Travel website, a leading and admired travel and tour firm with several years of experiences ",
    image: "src/assets/ageunited.png",
    tags: ["HTML", "CSS", "JAVASCRIPT"],
    liveLink: "https://ageunitedtravel.com/",
    codeLink: "/",
  },
  {
    title: "JC STORE",
    description: "Developed a fullstack e-commerce platform",
    image: "src/assets/jcstore.png",
    tags: ["VUEJS", "MONGODB", "EXPRESSJS"],
    liveLink: "https://jc-shop.onrender.com/",
    codeLink: "/",
  },
  {
    title: "Age Green Campaign Initiative",
    description: "A non-governmental organization (NGO) pioneering cleaner, greener, eco-friendly and healthier environment ",
    image: "src/assets/agci.png",
    tags: ["HTML", "CSS", "JAVASCRIPT"],
    liveLink: "https://www.agcinitiative.org/",
    codeLink: "/",
  },
  {
    title: "E-MECHANIC",
    description: "A mobile app that connect car owners to the nearest mechanic in an emergency",
    image: "src/assets/emechanic.png",
    tags: ["HTML", "CSS", "JAVASCRIPT", "PHP"],
    liveLink: "#",
    codeLink: "/",
  },
  {
    title: "SHOPWITHYEM",
    description: "ShopWithYEM is the global marketplace for unique and creative products, you can pay with YEM",
    image: "src/assets/shopwithyem2.png",
    tags: ["WORDPRESS", "PHP", "JAVASCRIPT"],
    liveLink: "https://shopwithyem.com/",
    codeLink: "/",
  },
  {
    title: "Uber Clone",
    description: "",
    image: "src/assets/uclone.png",
    tags: ["VUEJS", "EXPRESSJS", "PWA"],
    liveLink: "https://jc-uberclone.onrender.com/",
    codeLink: "/",
  },
  {
    title: "Goodluck Africa UI",
    description: "",
    image: "src/assets/goodluckafricaui.png",
    tags: ["FIGMA"],
    liveLink: "javascript:void(0)",
    codeLink: "/",
  },
]);
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

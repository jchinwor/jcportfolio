<template>
  <section id="services" class="relative text-white mt-32">
    <SectionHeader title="Services" />
    <div
      class="mt-20 py-8 xl:px-16 px-4 sm:py-16 grid grid-cols-1 gap-4 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 md:grid-cols-2 lg:grid-cols-4 items-stretch"
    >
      <article
        class="px-[12px] mb-[24px] flex h-full"
        v-for="data in services"
        :key="data.id"
      >
        <div
          class="mt-[30px] relative flex flex-col justify-center text-center rounded-[30px] border border-[#E2E8F0] dark:bg-[#ffffff29] bg-primary"
          data-aos="fade-up"
          :data-aos-delay="data.id * 100"
        >
          <div class="mt-[30px] flex justify-center relative">
            <div class="mt-[-7px] p-[20px] relative bg-primary rounded-[50%]">
              <span
                class="h-[60px] w-[60px] m-auto border-[1px] border-solid border-secondary absolute top-[8px] left-[8px] rounded-[50%] inline-block z-[5]"
              ></span>
              <img
                :src="data.icon"
                :alt="data.name"
                class="h-[35px] w-[35px] relative z-[1]"
              />
            </div>
          </div>
          <div class="p-[30px]">
            <h3 class="uppercase font-semibold text-secondary text-base">
              {{ data.name }}
            </h3>
            <p class="text-[14px] leading-[20px] text-white tracking-[0.03rem]">
              {{ data.description }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import SectionHeader from "./UI/SectionHeader.vue";

const services = ref([
  {
    id: 1,
    icon: "src/assets/webapp.png",
    name: "Web Development",
    description:
      "I build fast, responsive, and scalable websites using the latest technologies like Vue.js, Nuxt.js, and Tailwind CSS, ensuring a seamless user experience",
  },
  {
    id: 2,
    icon: "src/assets/app.png",
    name: "App Development",
    description:
      "Creating high-performance web and mobile apps with intuitive UI, smooth functionality, and scalable architecture to bring your ideas to life",
  },
  {
    id: 3,
    icon: "src/assets/marketing.png",
    name: "Digital Marketing",
    description:
      "Boosting your brand’s online presence with SEO, social media marketing, and data-driven strategies to drive traffic and conversions",
  },
  {
    id: 4,
    icon: "src/assets/uiux.png",
    name: "UI/UX",
    description:
      "Designing user-friendly, visually stunning, and intuitive interfaces that enhance engagement and improve conversions",
  },
]);
</script>

<style></style>

<template>
  <section id="services" class="relative mt-32 px-4 xl:px-16">
    <SectionHeader title="Services" />

    <p class="text-center text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto text-base">
      End-to-end solutions — from concept and design to deployment and growth.
    </p>

    <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="service in services"
        :key="service.id"
        class="group relative rounded-2xl p-7 border transition-all duration-300 cursor-default
               bg-white dark:bg-[#161616]
               border-gray-100 dark:border-gray-800
               hover:border-secondary/40 dark:hover:border-secondary/40
               hover:-translate-y-1.5 hover:shadow-xl hover:shadow-secondary/5"
        data-aos="fade-up"
        :data-aos-delay="service.id * 80"
      >
        <!-- Background number watermark -->
        <span class="absolute top-4 right-5 text-6xl font-black text-gray-100 dark:text-gray-800 select-none leading-none transition-all duration-300 group-hover:text-secondary/10">
          {{ String(service.id).padStart(2, '0') }}
        </span>

        <!-- Icon badge -->
        <div class="relative z-10 mb-6 w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-secondary/20 group-hover:scale-110">
          <Icon :icon="service.icon" class="text-2xl text-secondary" />
        </div>

        <!-- Title -->
        <h3 class="relative z-10 text-base font-bold text-gray-900 dark:text-white mb-3 group-hover:text-secondary transition-colors duration-200">
          {{ service.name }}
        </h3>

        <!-- Description -->
        <p class="relative z-10 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {{ service.description }}
        </p>

        <!-- Hover reveal -->
        <div class="relative z-10 mt-6 flex items-center gap-1.5 text-secondary text-xs font-bold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
          What I offer
          <Icon icon="lucide:arrow-right" class="text-sm" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from "./UI/SectionHeader.vue";

const services = [
  {
    id: 1,
    icon: "lucide:globe-2",
    name: "Web Development",
    description:
      "Fast, responsive, and scalable websites built with modern tecnologies — crafted for performance and seamless user experiences.",
  },
  {
    id: 2,
    icon: "lucide:smartphone",
    name: "App Development",
    description:
      "High-performance web and mobile apps with intuitive UI, smooth functionality, and scalable architecture that bring ideas to life.",
  },
  {
    id: 3,
    icon: "lucide:trending-up",
    name: "Digital Marketing",
    description:
      "Amplify your brand's reach with SEO, social media strategy, and data-driven campaigns designed to drive traffic and conversions.",
  },
  {
    id: 4,
    icon: "lucide:pen-tool",
    name: "UI/UX Design",
    description:
      "User-friendly, visually compelling interfaces designed in Figma — balancing aesthetics with usability to maximize engagement.",
  },
];
</script>

<style></style>

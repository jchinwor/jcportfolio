<script setup>
import { defineAsyncComponent } from "vue";

const Navbar = defineAsyncComponent(() => import("@/components/Navbar.vue"));
const HeroSection = defineAsyncComponent(() =>
  import("@/components/HeroSection.vue")
);
const Counter = defineAsyncComponent(() => import("@/components/Counter.vue"));
const Services = defineAsyncComponent(() =>
  import("@/components/Services.vue")
);
const Projects = defineAsyncComponent(() =>
  import("@/components/Projects.vue")
);
const Skills = defineAsyncComponent(() => import("@/components/Skills.vue"));
const Contact = defineAsyncComponent(() => import("@/components/Contact.vue"));
const Footer = defineAsyncComponent(() => import("@/components/Footer.vue"));
const BackToTop = defineAsyncComponent(() =>
  import("@/components/BackToTop.vue")
);
// import Navbar from "./components/Navbar.vue";
// import HeroSection from "./components/HeroSection.vue";
// import Services from "./components/Services.vue";
// import Counter from "./components/Counter.vue";
// import Skills from "./components/Skills.vue";
// import Projects from "./components/Projects.vue";
// import Contact from "./components/Contact.vue";
// import Footer from "./components/Footer.vue";
// import BackToTop from "./components/BackToTop.vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";
</script>

<template>
  <div class="bg-[#D4EBF8] dark:bg-[#121212] min-h-screen">
    <Suspense>
      <template #default>
        <div>
          <Navbar />
          <HeroSection />
          <Counter />
          <Services />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
          <BackToTop />
        </div>
      </template>
      <template #fallback>
        <div class="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style>
* {
  scrollbar-width: thin;
  scrollbar-color: #111827 #f1f1f1;
}
</style>

<script setup>
import { defineAsyncComponent } from "vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";

const Navbar = defineAsyncComponent(() => import("@/components/Navbar.vue"));
const HeroSection = defineAsyncComponent(() => import("@/components/HeroSection.vue"));
const Counter = defineAsyncComponent(() => import("@/components/Counter.vue"));
const Services = defineAsyncComponent(() => import("@/components/Services.vue"));
const Projects = defineAsyncComponent(() => import("@/components/Projects.vue"));
const Skills = defineAsyncComponent(() => import("@/components/Skills.vue"));
const Contact = defineAsyncComponent(() => import("@/components/Contact.vue"));
const Footer = defineAsyncComponent(() => import("@/components/Footer.vue"));
const BackToTop = defineAsyncComponent(() => import("@/components/BackToTop.vue"));
</script>

<template>
  <div class="relative min-h-[100dvh] bg-canvas text-ink">
    <Suspense>
      <template #default>
        <div>
          <Navbar />
          <main>
            <HeroSection />
            <Counter />
            <Services />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </template>
      <template #fallback>
        <div class="flex min-h-[100dvh] items-center py-20">
          <LoadingSpinner />
        </div>
      </template>
    </Suspense>
  </div>
</template>

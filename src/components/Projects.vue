<template>
  <section id="projects" class="scroll-mt-20 py-20 lg:py-24">
    <div class="mx-auto max-w-[1200px] px-4 sm:px-6">
      <div class="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          title="Selected projects"
          subtitle="Websites, apps, and interfaces shipped for clients and for myself."
        />

        <!-- Category filter pills -->
        <div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category" data-aos="fade-up">
          <button
            v-for="cat in categories"
            :key="cat"
            role="tab"
            :aria-selected="activeCategory === cat"
            @click="activeCategory = cat"
            class="press rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="
              activeCategory === cat
                ? 'border-btn bg-btn text-on-btn'
                : 'border-edge bg-card text-muted hover:border-edge-strong hover:text-ink'
            "
          >
            {{ cat }}
            <span class="ml-1 text-xs opacity-60">{{ countFor(cat) }}</span>
          </button>
        </div>
      </div>

      <TransitionGroup
        v-if="filteredProjects.length"
        name="grid"
        tag="div"
        class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.title"
          :title="project.title"
          :description="project.description"
          :image="project.image"
          :tags="project.tags"
          :liveLink="project.liveLink"
          :codeLink="project.codeLink"
        />
      </TransitionGroup>

      <!-- Empty state -->
      <div
        v-else
        class="mt-12 flex flex-col items-center justify-center rounded-panel border border-dashed border-edge-strong bg-band px-6 py-20 text-center"
      >
        <span class="inline-flex h-12 w-12 items-center justify-center rounded-full border border-edge bg-card text-muted">
          <Icon icon="tabler:folder-open" class="text-2xl" aria-hidden="true" />
        </span>
        <p class="mt-4 font-display text-lg font-semibold text-ink">Nothing here yet</p>
        <p class="mt-1 max-w-sm text-sm text-muted">No projects in this category for now. Try another filter.</p>
        <button
          @click="activeCategory = 'All'"
          class="press mt-6 rounded-full border border-edge-strong px-5 py-2 text-sm font-medium text-ink hover:bg-card"
        >
          Show all projects
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import SectionHeader from "./UI/SectionHeader.vue";
import ProjectCard from "./UI/ProjectCard.vue";

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

const projects = [
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
];

const countFor = (cat) => (cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length);

const filteredProjects = computed(() =>
  activeCategory.value === "All" ? projects : projects.filter((p) => p.category === activeCategory.value)
);
</script>

<style scoped>
.grid-enter-active,
.grid-leave-active,
.grid-move {
  transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.grid-leave-active {
  position: absolute;
  width: 0;
  overflow: hidden;
}
</style>

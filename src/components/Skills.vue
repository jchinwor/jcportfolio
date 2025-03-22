<template>
  <section class="mt-32" id="skills">
    <SectionHeader title="My Skills" />
    <div class="mt-20 flex justify-center">
      <ul class="flex flex-wrap justify-center items-center">
        <li
          ref="skillRefs"
          v-for="(skill, index) in skills"
          :key="index"
          :class="`mx-[15px] rounded-[12px] mb-7 bg-gradient-to-t ${skill.bgGradient}`"
        >
          <div
            class="rounded-[12px] bg-primary mt-[3px] p-12 md:p-5 text-center"
          >
            <h3
              class="font-bold text-[35px] text-white flex items-center justify-center"
            >
              <Countup
                v-if="visibleItems[index]"
                :endVal="skill.percentage"
                :startVal="0"
                :duration="2"
              />
              %
            </h3>
            <p
              class="font-normal text-[16px]"
              :style="{ color: skill.textColor }"
            >
              {{ skill.title }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SectionHeader from "./UI/SectionHeader.vue";

const skills = ref([
  {
    percentage: 80,
    title: "Figma",
    bgGradient: "to-[#acac39] from-[#1f1e1c99]",
    textColor: "#FFE600",
  },
  {
    percentage: 83,
    title: "TailwindCSS",
    bgGradient: "to-[#acac39] from-[#1f1e1c99]",
    textColor: "#FFE600",
  },
  {
    percentage: 75,
    title: "NUXT JS",
    bgGradient: "to-[#59c33789] from-[#1f1e1c99]",
    textColor: "#59c378",
  },
  {
    percentage: 88,
    title: "Photoshop",
    bgGradient: "to-[#dd584f99] from-[#1f1e1c99]",
    textColor: "#dd584f",
  },
  {
    percentage: 85,
    title: "VUE JS",
    bgGradient: "to-[#ff9a0099] from-[#1f1e1c99]",
    textColor: "#ff9a00",
  },
  {
    percentage: 80,
    title: "Illustrator",
    bgGradient: "to-[#ff9a0099] from-[#1f1e1c99]",
    textColor: "#ff9a00",
  },
  {
    percentage: 90,
    title: "Wordpress",
    bgGradient: "to-[#00a9ff99] from-[#1f1e1c99]",
    textColor: "#00a9ff",
  },
  {
    percentage: 84,
    title: "MongoDB",
    bgGradient: "to-[#9e00ff99] from-[#1f1e1c99]",
    textColor: "#ad00ff",
  },
  {
    percentage: 85,
    title: "MYSQL",
    bgGradient: "to-[#ff9a0099] from-[#1f1e1c99]",
    textColor: "#ff9a00",
  },
  {
    percentage: 75,
    title: "Firebase",
    bgGradient: "to-[#dd584f99] from-[#1f1e1c99]",
    textColor: "#dd584f",
  },
  {
    percentage: 98,
    title: "HTML5",
    bgGradient: "to-[#acac39] from-[#1f1e1c99]",
    textColor: "#ffe600",
  },
  {
    percentage: 80,
    title: "JAVASCRIPT",
    bgGradient: "to-[#59c37899] from-[#1f1e1c99]",
    textColor: "#59c378",
  },
]);

//Track visibility of items
const visibleItems = ref(skills.value.map(() => false));
const skillRefs = ref([]);

//IntersectionObserver Logic

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = skillRefs.value.indexOf(entry.target);
          if (index !== -1) {
            visibleItems.value[index] = true; //Mark item as visible
          }
        }
      });
    },
    { threshold: 0.3 } //Trigger When 30% of element visible
  );

  //Observe all skills element
  skillRefs.value.forEach((el) => observer.observe(el));
});
</script>

<style></style>

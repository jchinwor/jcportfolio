<template>
  <section
    data-aos="zoom-in"
    class="flex justify-center p-8 items-center dark:text-white min-h-screen  lg:mt-0"
  >
    <header
      class="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-secondary opacity-30 dark:opacity-20 blur-[100px] left-10 top-0 hidden md:block"
    ></header>
    <header
      class="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-secondary opacity-30 dark:opacity-20 blur-[100px] right-10 bottom-0 hidden md:block"
    ></header>
    <main
      class="absolute grid lg:grid-cols-2 grid-cols-1 items-center p-2 lg:p-8"
    >
      <header>
        <h1 class="mb-6 text-4xl text-center lg:text-left md:text-5xl lg:text-6xl font-bold">
          Hi, i'm
          <span
            class="dark:text-secondary "
            >Jenkins</span
          >
        </h1>
        <h4 class="mb-3 text-center font-bold lg:text-left">
          Front-End Engineer / UI/UX Designer
        </h4>
        <p class="text-lg text-center lg:text-left max-w-xl mx-auto dark:text-[#86868b] lg:mx-0 ">
         I transform complex challenges into elegant, user-centered solutions. Specializing in building modern web applications with clean code and thoughtful design
        </p>
        <div class="mt-6 flex justify-center lg:justify-start">
          <Button :onClick="handleClick" label="Show Works" class="cursor-pointer" />
          <a
            href="#contact"
            class="font-semibold text-lg w-[10rem] h-[55px] dark:text-secondary rounded-full ml-2  dark:border-secondary hover:scale-105 bg-white dark:bg-transparent flex justify-center items-center text-primary border-primary"
          >
          
            <span class="ml-1">Contact Me</span>
          </a>
        </div>
      </header>
     

      <aside
        class="flex justify-center lg:justify-end mt-20 lg:mt-0 items-center flex-wrap"
      >
      
      <div class="relative w-60 h-60 md:w-100 md:h-100 rounded-full p-3 ">
        <div class="w-full h-full   rounded-full overflow-hidden ">
          <img src="@/assets/jenkinsv5.png" alt="jenkins" loading="lazy" class="w-full rounded-full p-2 h-full shadow-xl shadow-[#d0d0d0] border-10 border-transparent object-cover">
        </div>
      </div>
      </aside>
    </main>
    <!-- <svg class="">
      <filter id="wavy1">
        <feTurbulence
          x="0"
          y="0"
          baseFrequency="0.2"
          numOctaves="5"
          seed="1"
        ></feTurbulence>
        <feDisplacementMap in="SourceGraphic" scale="30" />
      </filter>
    </svg> -->
  </section>
</template>

<script setup>
import Button from "./UI/Button.vue";


const handleClick = () => {
   window.location.href = "#projects";
};
</script>

<style scoped>
.container .card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background: transparent;
}
.container .card:nth-of-type(1)::before {
  filter: url(#wavy1);
}
</style>

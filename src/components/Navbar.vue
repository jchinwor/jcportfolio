<template>
 <header
  class="sticky top-0 z-30 "
>
  <div
    class="flex justify-between items-center pt-6 pb-4 px-3 xl:px-20 relative"
  >
    <!-- Logo -->
    <div v-if="isDarkMode" class="text-3xl font-bold dark:text-white">
      <img src="@/assets/jclogo.png" class="w-20" alt="jclogo" />
    </div>
    <div v-else class="text-3xl font-bold dark:text-white">
      <img src="@/assets/jclogoblack.png" class="w-20" alt="jclogo" />
    </div>

    <!-- Mobile Toggle -->
    <div class="md:hidden z-30">
      <button
        class="block focus:outline-none"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span
          v-if="isMenuOpen"
          class="text-4xl text-white dark:text-white cursor-pointer"
        >
          <Icon icon="zondicons:close-solid" />
        </span>
        <span
          v-else
          class="text-4xl text-primary dark:text-white cursor-pointer"
        >
          <Icon icon="hugeicons:menu-02" />
        </span>
      </button>
    </div>

    <!-- Navigation -->
    <nav
      :class="[
        'transition-all duration-500 ease-in-out md:relative md:z-20 md:flex md:items-center md:justify-end md:flex-row',
        isMenuOpen
          ? 'fixed inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md opacity-100 visible'
          : 'hidden md:opacity-100 md:visible',
      ]"
      class="md:bg-[rgba(255,255,255,0.08)] md:backdrop-blur-xl md:shadow-[0_0_15px_rgba(0,255,255,0.4)] md:border md:border-[rgba(255,255,255,0.2)] md:rounded-2xl md:px-10 md:py-3"
    >
      <ul
        class="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0"
      >
        <li v-for="item in Menu" :key="item.name">
          <a
            @click="scrollToSection(item.href)"
            :href="item.href"
            class="block transition ease-linear md:text-lg lg:text-xl font-bold text-white md:text-primary hover:text-secondary dark:text-white dark:hover:text-secondary"
          >
            {{ item.name }}
          </a>
        </li>
      </ul>

      <!-- Dark Mode Toggle -->
      <button
        @click="toggleDarkMode"
        class="text-white md:ml-8 z-10 mt-3 md:mt-0 flex flex-col items-center md:block"
      >
        <Icon
          v-if="!isDarkMode"
          icon="tabler:moon-filled"
          class="text-3xl text-primary cursor-pointer"
        />
        <Icon
          v-else
          icon="solar:sun-outline"
          class="text-3xl text-secondary cursor-pointer"
        />
      </button>
    </nav>
  </div>
</header>

</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
const Menu = ref([
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]);

const scrollToSection = (href) => {
  isMenuOpen.value = false;
  const section = document.querySelector(href);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

//Reactive property to track dark mode state
const isDarkMode = ref(localStorage.getItem("theme") === "dark");

const toggleDarkMode = () => {
  const html = document.documentElement;
  if (isDarkMode.value) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }

  //update dark mode state
  isDarkMode.value = !isDarkMode.value;
};
</script>

<style></style>

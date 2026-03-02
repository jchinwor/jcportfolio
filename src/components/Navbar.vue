<template>
  <header
    class="sticky top-0 z-30 transition-all duration-300"
    :class="isScrolled ? 'bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800' : ''"
  >
    <div class="flex justify-between items-center py-4 px-4 xl:px-20">
      <!-- Logo -->
      <a href="#" aria-label="Go to top">
        <img v-if="isDarkMode" src="@/assets/jclogo.png" class="w-14" alt="Jenkins Chinwor" />
        <img v-else src="@/assets/jclogoblack.png" class="w-14" alt="Jenkins Chinwor" />
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl px-6 py-2.5 shadow-sm">
        <ul class="flex items-center gap-6">
          <li v-for="item in Menu" :key="item.name">
            <a
              @click.prevent="scrollToSection(item.href)"
              :href="item.href"
              class="relative text-sm lg:text-base font-semibold text-gray-700 dark:text-white hover:text-secondary dark:hover:text-secondary transition-colors duration-200 group"
              :class="activeSection === item.href.replace('#', '') ? '!text-secondary' : ''"
            >
              {{ item.name }}
              <span
                class="absolute -bottom-1 left-0 h-0.5 bg-secondary rounded-full transition-all duration-300 group-hover:w-full"
                :class="activeSection === item.href.replace('#', '') ? 'w-full' : 'w-0'"
              ></span>
            </a>
          </li>
        </ul>
        <button
          @click="toggleDarkMode"
          class="ml-6 flex items-center"
          :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Icon v-if="!isDarkMode" icon="tabler:moon-filled" class="text-2xl text-gray-600 hover:text-secondary transition-colors duration-200 cursor-pointer" />
          <Icon v-else icon="solar:sun-outline" class="text-2xl text-secondary hover:opacity-80 transition-opacity duration-200 cursor-pointer" />
        </button>
      </nav>

      <!-- Mobile: dark mode + hamburger -->
      <div class="md:hidden flex items-center gap-3">
        <button @click="toggleDarkMode" :aria-label="isDarkMode ? 'Light mode' : 'Dark mode'">
          <Icon v-if="!isDarkMode" icon="tabler:moon-filled" class="text-2xl text-gray-600" />
          <Icon v-else icon="solar:sun-outline" class="text-2xl text-secondary" />
        </button>
        <button @click="openMenu" aria-label="Open menu" class="text-gray-700 dark:text-white">
          <Icon icon="hugeicons:menu-02" class="text-3xl" />
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile: Backdrop -->
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        @click="closeMenu"
      ></div>
    </transition>

    <!-- Mobile: Slide-in Drawer -->
    <transition name="slide">
      <aside
        v-if="isMenuOpen"
        class="fixed top-0 right-0 h-full w-72 z-50 bg-white dark:bg-[#1a1a1a] shadow-2xl flex flex-col md:hidden"
      >
        <!-- Drawer header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <img v-if="isDarkMode" src="@/assets/jclogo.png" class="w-12" alt="Jenkins Chinwor" />
          <img v-else src="@/assets/jclogoblack.png" class="w-12" alt="Jenkins Chinwor" />
          <button
            @click="closeMenu"
            aria-label="Close menu"
            class="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Icon icon="zondicons:close-solid" class="text-xl" />
          </button>
        </div>

        <!-- Drawer nav items -->
        <nav class="flex flex-col px-4 py-6 gap-1 flex-1 overflow-y-auto">
          <a
            v-for="item in Menu"
            :key="item.name"
            @click.prevent="scrollToSection(item.href)"
            :href="item.href"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-semibold transition-all duration-200"
            :class="
              activeSection === item.href.replace('#', '')
                ? 'bg-secondary/10 text-secondary'
                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-secondary dark:hover:text-secondary'
            "
          >
            <Icon :icon="item.icon" class="text-lg opacity-70" />
            {{ item.name }}
          </a>
        </nav>

        <!-- Drawer footer -->
        <div class="px-6 py-4 border-t border-gray-100 dark:border-gray-800">
          <p class="text-xs text-gray-400 text-center">Jenkins Chinwor &copy; {{ new Date().getFullYear() }}</p>
        </div>
      </aside>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMenuOpen = ref(false);
const isScrolled = ref(false);
const activeSection = ref("");

const Menu = ref([
  { name: "Services", href: "#services", icon: "lucide:layout-grid" },
  { name: "Tools", href: "#skills", icon: "lucide:wrench" },
  { name: "Projects", href: "#projects", icon: "lucide:folder-open" },
  { name: "Contact", href: "#contact", icon: "lucide:mail" },
]);

const openMenu = () => {
  isMenuOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeMenu = () => {
  isMenuOpen.value = false;
  document.body.style.overflow = "";
};

const scrollToSection = (href) => {
  closeMenu();
  const section = document.querySelector(href);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 60;
  const sections = Menu.value.map((item) => item.href.replace("#", ""));
  for (const id of [...sections].reverse()) {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 140) {
      activeSection.value = id;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  document.body.style.overflow = "";
});

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
  isDarkMode.value = !isDarkMode.value;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>

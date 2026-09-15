<template>
  <!-- Sentinel: when it leaves the viewport the header gains its backdrop. -->
  <div ref="sentinel" aria-hidden="true" class="absolute top-0 h-px w-px"></div>

  <header
    class="sticky top-0 z-30 transition-[background-color,border-color,backdrop-filter] duration-300 border-b"
    :class="isScrolled ? 'bg-canvas/80 backdrop-blur-xl border-edge' : 'bg-transparent border-transparent'"
  >
    <div class="mx-auto flex h-16 md:h-[72px] max-w-[1200px] items-center justify-between px-4 sm:px-6">
      <!-- Logo -->
      <a href="#" aria-label="Back to top" class="flex items-center shrink-0">
        <img v-if="isDarkMode" src="@/assets/jclogo.png" class="h-9 w-auto" alt="Jenkins Chinwor" />
        <img v-else src="@/assets/jclogoblack.png" class="h-9 w-auto" alt="Jenkins Chinwor" />
      </a>

      <!-- Desktop: floating pill nav -->
      <nav aria-label="Primary" class="hidden md:block absolute left-1/2 -translate-x-1/2">
        <ul class="flex items-center gap-1 rounded-full border border-edge bg-card/70 backdrop-blur-xl p-1">
          <li v-for="item in Menu" :key="item.name">
            <a
              :href="item.href"
              @click.prevent="scrollToSection(item.href)"
              class="press block rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200"
              :class="activeSection === item.id ? 'bg-band text-ink' : 'text-muted hover:text-ink'"
              :aria-current="activeSection === item.id ? 'location' : undefined"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Right: theme toggle + mobile menu -->
      <div class="flex items-center gap-2">
        <button
          @click="toggleDarkMode"
          class="press inline-flex h-9 w-9 items-center justify-center rounded-full border border-edge text-muted hover:text-ink hover:border-edge-strong transition-colors duration-200"
          :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Icon :icon="isDarkMode ? 'tabler:sun' : 'tabler:moon'" class="text-lg" aria-hidden="true" />
        </button>
        <button
          @click="openMenu"
          aria-label="Open menu"
          class="press md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-edge text-ink"
        >
          <Icon icon="tabler:menu-2" class="text-xl" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile drawer -->
  <Teleport to="body">
    <transition name="fade">
      <div v-if="isMenuOpen" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden" @click="closeMenu"></div>
    </transition>

    <transition name="slide">
      <aside
        v-if="isMenuOpen"
        class="fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l border-edge bg-canvas md:hidden"
        aria-label="Mobile navigation"
      >
        <div class="flex items-center justify-between border-b border-edge px-5 py-4">
          <img v-if="isDarkMode" src="@/assets/jclogo.png" class="h-9 w-auto" alt="Jenkins Chinwor" />
          <img v-else src="@/assets/jclogoblack.png" class="h-9 w-auto" alt="Jenkins Chinwor" />
          <button
            @click="closeMenu"
            aria-label="Close menu"
            class="press inline-flex h-9 w-9 items-center justify-center rounded-full border border-edge text-muted hover:text-ink"
          >
            <Icon icon="tabler:x" class="text-lg" aria-hidden="true" />
          </button>
        </div>

        <nav class="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          <a
            v-for="item in Menu"
            :key="item.name"
            :href="item.href"
            @click.prevent="scrollToSection(item.href)"
            class="press flex items-center gap-3 rounded-full px-4 py-3 text-[15px] font-medium transition-colors duration-200"
            :class="activeSection === item.id ? 'bg-band text-ink' : 'text-muted hover:bg-band hover:text-ink'"
          >
            <Icon :icon="item.icon" class="text-lg" aria-hidden="true" />
            {{ item.name }}
          </a>
        </nav>

        <div class="border-t border-edge px-5 py-4">
          <p class="text-xs text-faint">JCsoft &copy; {{ new Date().getFullYear() }}</p>
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
const sentinel = ref(null);

const Menu = [
  { name: "Services", href: "#services", id: "services", icon: "tabler:layout-grid" },
  { name: "Tools", href: "#skills", id: "skills", icon: "tabler:tool" },
  { name: "Projects", href: "#projects", id: "projects", icon: "tabler:folder" },
  { name: "Contact", href: "#contact", id: "contact", icon: "tabler:mail" },
];

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
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

let sentinelObserver;
let sectionObserver;

onMounted(() => {
  // Header backdrop: driven by whether the top-of-page sentinel is visible.
  sentinelObserver = new IntersectionObserver(
    ([entry]) => { isScrolled.value = !entry.isIntersecting; },
    { threshold: 0 }
  );
  if (sentinel.value) sentinelObserver.observe(sentinel.value);

  // Scroll spy: a section is active while it crosses the middle band of the viewport.
  // Sections are async components, so observe once they exist.
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id;
      });
    },
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
  );
  const attach = () => {
    const missing = Menu.filter((m) => !document.getElementById(m.id));
    Menu.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) sectionObserver.observe(el);
    });
    return missing.length === 0;
  };
  if (!attach()) {
    const retry = setInterval(() => { if (attach()) clearInterval(retry); }, 300);
    setTimeout(() => clearInterval(retry), 10000);
  }
});

onUnmounted(() => {
  sentinelObserver?.disconnect();
  sectionObserver?.disconnect();
  document.body.style.overflow = "";
});

const isDarkMode = ref(document.documentElement.classList.contains("dark"));

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
.fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

.slide-enter-active,
.slide-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from,
.slide-leave-to { transform: translateX(100%); }
</style>

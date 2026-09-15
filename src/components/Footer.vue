<template>
  <footer class="border-t border-edge bg-canvas">
    <div class="mx-auto max-w-[1200px] px-4 py-14 sm:px-6">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
        <!-- Brand -->
        <div class="flex flex-col gap-4 md:col-span-6">
          <img v-if="isDark" src="@/assets/jclogo.png" class="h-10 w-auto self-start" alt="Jenkins Chinwor logo" />
          <img v-else src="@/assets/jclogoblack.png" class="h-10 w-auto self-start" alt="Jenkins Chinwor logo" />
          <p class="max-w-xs text-sm leading-relaxed text-muted">
            Building fast, elegant, and user-centered digital experiences. Let's create something great together.
          </p>
          <div class="mt-1 flex gap-3">
            <a
              href="https://www.linkedin.com/in/jenkins-chinwor/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              class="press inline-flex h-9 w-9 items-center justify-center rounded-full border border-edge text-muted transition-colors duration-200 hover:border-edge-strong hover:text-ink"
            >
              <Icon icon="tabler:brand-linkedin" class="text-lg" aria-hidden="true" />
            </a>
            <a
              href="https://github.com/jchinwor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              class="press inline-flex h-9 w-9 items-center justify-center rounded-full border border-edge text-muted transition-colors duration-200 hover:border-edge-strong hover:text-ink"
            >
              <Icon icon="tabler:brand-github" class="text-lg" aria-hidden="true" />
            </a>
          </div>
        </div>

        <!-- Quick links -->
        <nav aria-label="Footer" class="md:col-span-3">
          <h4 class="text-sm font-semibold text-ink">Quick links</h4>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in navLinks" :key="link.name">
              <a :href="link.href" class="text-sm text-muted transition-colors duration-200 hover:text-ink">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </nav>

        <!-- Services -->
        <div class="md:col-span-3">
          <h4 class="text-sm font-semibold text-ink">Services</h4>
          <ul class="mt-4 space-y-2.5">
            <li v-for="service in serviceLinks" :key="service" class="text-sm text-muted">
              {{ service }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 border-t border-edge pt-6 text-xs text-faint">
        <p>&copy; {{ new Date().getFullYear() }} JCsoft. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Technologies", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const serviceLinks = ["Web Development", "App Development", "UI/UX Design", "Digital Marketing"];

// Track the theme class so the right logo file shows in each mode.
const isDark = ref(document.documentElement.classList.contains("dark"));
let observer;
onMounted(() => {
  observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains("dark");
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
});
onUnmounted(() => observer?.disconnect());
</script>

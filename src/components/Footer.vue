<template>
  <footer class="z-10 text-white bg-primary mt-20 border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

        <!-- Brand -->
        <div class="flex flex-col gap-4">
          <img src="@/assets/jclogo.png" class="w-16" alt="Jenkins Chinwor logo" />
          <p class="text-gray-400 text-sm leading-relaxed max-w-xs">
            Building fast, elegant, and user-centered digital experiences. Let's create something great together.
          </p>
          <div class="flex gap-4 mt-1">
            <a
              href="https://www.linkedin.com/in/jenkins-chinwor/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-secondary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Icon icon="fa-brands:linkedin" class="text-xl" />
            </a>
            <a
              href="https://github.com/jchinwor"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-secondary transition-colors duration-200"
              aria-label="GitHub"
            >
              <Icon icon="fa-brands:github" class="text-xl" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.name">
              <a
                :href="link.href"
                class="text-gray-400 hover:text-secondary transition-colors duration-200 text-sm"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Services</h4>
          <ul class="space-y-2">
            <li v-for="service in serviceLinks" :key="service" class="text-gray-400 text-sm">
              {{ service }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
        <p class="text-gray-500 text-sm">
          &copy; {{ new Date().getFullYear() }} JCsoft. All Rights Reserved.
        </p>
        <p class="text-gray-600 text-xs">
          <!-- Built with love -->
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Technologies", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Web Development",
  "App Development",
  "UI/UX Design",
  "Digital Marketing",
];
</script>

<style></style>

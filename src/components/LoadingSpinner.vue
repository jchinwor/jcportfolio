<template>
  <!-- Skeleton matching the hero's shape, so the page does not jump when content arrives -->
  <div class="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12" role="status" aria-label="Loading">
    <div class="lg:col-span-7">
      <div class="skeleton h-7 w-48 rounded-full"></div>
      <div class="skeleton mt-8 h-16 w-3/4 rounded-card"></div>
      <div class="skeleton mt-5 h-7 w-1/2 rounded-card"></div>
      <div class="skeleton mt-7 h-5 w-full max-w-md rounded-card"></div>
      <div class="skeleton mt-3 h-5 w-2/3 max-w-md rounded-card"></div>
      <div class="mt-9 flex gap-3">
        <div class="skeleton h-12 w-36 rounded-full"></div>
        <div class="skeleton h-12 w-36 rounded-full"></div>
      </div>
    </div>
    <div class="flex justify-center lg:col-span-5 lg:justify-end">
      <div class="skeleton aspect-[4/5] w-64 rounded-[20px] sm:w-72 lg:w-80"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  background: linear-gradient(90deg, var(--band) 0%, var(--card) 50%, var(--band) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}
@keyframes shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}
</style>

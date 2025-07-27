<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <nav
    :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')"
  >
    <router-link
      to="/projects"
      class="text-sm font-medium transition-colors hover:text-primary"
    >
      Projects
    </router-link>
  </nav>
</template>
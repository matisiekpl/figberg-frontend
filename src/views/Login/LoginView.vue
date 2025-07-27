<script setup lang="ts">

import {Button} from "@/components/ui/button";
import {useAuthStore} from "@/stores/auth.store.ts";
import {Figma, Loader2} from 'lucide-vue-next';
import {onMounted} from "vue";
import {useRoute} from "vue-router";

const authStore = useAuthStore();
const route = useRoute();

onMounted(() => {
  if (route.query.code) {
    authStore.exchange();
  }
});
</script>

<template>
  <div class="flex h-screen">
    <div class="m-auto text-center flex flex-col gap-3">
      <h2 class="text-2xl font-semibold">FigBerg</h2>
      <div class="">Connect Live Figma assets to your website</div>
      <Button @click="authStore.login()" class="cursor-pointer" :disabled="authStore.loading">
        <span v-if="authStore.loading" class="flex items-center gap-2">
           <Loader2 class="w-4 h-4 mr-2 animate-spin"/>
          Authenticating...
        </span>
        <span v-else class="flex items-center gap-2">
          <Figma/>
        Login with Figma
      </span>
      </Button>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">

import MainNav from "@/views/Dashboard/MainNav.vue";
import UserNav from "@/views/Dashboard/UserNav.vue";
import {useUserStore} from "@/stores/user.store.ts";
import {onMounted} from "vue";
import Spinner from "@/components/common/Spinner.vue";

const userStore = useUserStore();
onMounted(() => userStore.load());
</script>

<template>
  <div v-if="userStore.loaded">
    <div class="hidden flex-col md:flex">
      <div class="border-b ">
        <div class="flex h-16 items-center px-4 max-w-6xl mx-auto">
          <RouterLink to="/projects">
            <h2 class="font-semibold text-xl -mt-1">FigBerg</h2>
          </RouterLink>
          <MainNav class="mx-12"/>
          <div class="ml-auto flex items-center space-x-4">
            <UserNav/>
          </div>
        </div>
      </div>
    </div>
    <div class="max-w-6xl mx-auto px-4 mt-8">
      <router-view/>
    </div>
  </div>
  <div v-else>
    <div class="flex h-screen">
      <div class="m-auto">
        <Spinner/>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
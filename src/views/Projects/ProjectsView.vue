<script setup lang="ts">

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {useProjectStore} from "@/stores/project.store.ts";
import {Loader2, Download} from "lucide-vue-next";
import {onMounted} from "vue";

const projectStore = useProjectStore();
onMounted(() => projectStore.list());
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <h2 class="font-semibold text-3xl">Projects</h2>
      <span class="text-gray-600 text-sm">Here you can find a list of connected Figma files</span>
    </div>
    <div class="flex gap-3">
      <Input placeholder="Enter Figma link to connect project" v-model="projectStore.link"/>
      <Button
        :disabled="projectStore.link.includes('figma.com') && projectStore.link.toLowerCase().replace('https://www.figma.com/design/','').length<10 || projectStore.importing"
        @click="projectStore.add()"
        class="cursor-pointer"
      >
        <span class="flex" v-if="projectStore.importing">
          <Loader2 class="w-4 h-4 mr-2 animate-spin"/>
          Importing...
        </span>
        <span class="flex" v-else>
          <Download class="w-4 h-4 mr-2"/>
          Connect
        </span>
      </Button>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <Card class="m-0 bg-gray-100" v-for="project in projectStore.projects" :key="project.id">
        <img :src="project.previewUrl" :alt="project.name" class="rounded-t-xl h-64 object-contain">

        <div class="bg-white rounded-xl">
          <div class="mx-4 my-3">
            <h3 class="text-lg font-medium">{{project.name}}</h3>
          </div>
          <div class="mx-3 my-3 flex justify-end">
            <Button class="cursor-pointer">View</Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>
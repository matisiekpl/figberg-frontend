<script setup lang="ts">

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {useProjectsStore} from "@/stores/projects.store.ts";
import {Loader2, Download} from "lucide-vue-next";
import {onMounted} from "vue";
import {formatDistance} from 'date-fns';
import {viewInFigma} from "@/lib/utils.ts";

const projectsStore = useProjectsStore();
onMounted(() => projectsStore.list());


</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <h2 class="font-semibold text-3xl">Projects</h2>
      <span class="text-gray-600 text-sm">Here you can find a list of connected Figma files</span>
    </div>
    <div class="flex gap-3">
      <Input placeholder="Enter Figma link to connect project" v-model="projectsStore.link"/>
      <Button
        :disabled="projectsStore.link.includes('figma.com') && projectsStore.link.toLowerCase().replace('https://www.figma.com/design/','').length<10 || projectsStore.importing"
        @click="projectsStore.add()"
        class="cursor-pointer"
      >
        <span class="flex" v-if="projectsStore.importing">
          <Loader2 class="w-4 h-4 mr-2 animate-spin"/>
          Importing...
        </span>
        <span class="flex" v-else>
          <Download class="w-4 h-4 mr-2"/>
          Connect
        </span>
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card class="m-0 bg-gray-100" v-for="project in projectsStore.projects" :key="project.id">
        <img :src="project.previewUrl" :alt="project.name" class="rounded-t-xl h-64 object-contain">

        <div class="bg-white rounded-xl">
          <div class="mx-4 my-3">
            <h3 class="text-lg font-medium">{{ project.name }}</h3>
            <span class="text-sm text-gray-600">Synchronized {{
                formatDistance(project.lastSyncAt, new Date(), {addSuffix: true})
              }}</span>
          </div>
          <div class="mx-3 my-3 flex justify-end gap-3">
            <Button class="cursor-pointer" variant="outline" @click="viewInFigma(project)">View in Figma</Button>
            <RouterLink :to="'/projects/' + project.id">
              <Button class="cursor-pointer">Manage</Button>
            </RouterLink>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {useProjectStore} from "@/stores/project.store.ts";
import {onMounted} from "vue";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {viewInFigma} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input";
import {useIntervalFn} from "@vueuse/core";
import {LoaderCircle} from 'lucide-vue-next';
import {Progress} from "@/components/ui/progress";
import {Config} from "@/config.ts";

const projectStore = useProjectStore();

onMounted(() => projectStore.init());

useIntervalFn(() => projectStore.reload(), 500);
</script>

<template>
  <div class="flex flex-col gap-4" v-if="projectStore.state == 'Loaded' && projectStore.project && projectStore.nodes">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <RouterLink to="/projects">
            <BreadcrumbLink>
              Projects
            </BreadcrumbLink>
          </RouterLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator/>
        <BreadcrumbItem>
          <BreadcrumbPage>{{ projectStore.project.name }}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <div class="flex justify-between">
      <div>
        <h2 class="font-semibold text-3xl">{{ projectStore.project.name }}</h2>
        <span class="text-gray-600 text-sm">Project details</span>
      </div>
      <div class="flex gap-3">
        <Button @click="viewInFigma(projectStore.project)" class="cursor-pointer" variant="outline">View in Figma
        </Button>
        <Button @click="projectStore.sync" class="cursor-pointer" :disabled="projectStore.syncing">Synchronize</Button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card class="px-6 py-4 bg-white flex flex-col gap-3">
        <!--        <Label>Secret key</Label>-->
        <!--        <Input class="italic text-sm bg-red-100 text-red-800 font-medium" readonly v-model="projectStore.project.secret"/>-->
      </Card>

      <Card class="px-6 py-4 bg-white flex flex-col">
        <Label class="font-medium">Content Delivery Network</Label>
        <Label class="text-sm" v-if="projectStore.nodes.length > 0">{{ projectStore.availableNodesPercent }}% of images
          has been rendered</Label>
        <Label class="text-sm" v-else>Awaiting synchronization</Label>
        <Progress :model-value="projectStore.nodes.length > 0 ? projectStore.availableNodesPercent : 0" class="mt-2"
                  :class="{'[&>div]:bg-green-500':projectStore.availableNodesPercent == 100}"/>

        <div class="grid grid-cols-2 mt-3 gap-3">
          <Button class="cursor-pointer flex" :disabled="projectStore.nodes.length == 0" @click="projectStore.render">Render all</Button>
          <Button class="cursor-pointer bg-yellow-500 text-black hover:bg-yellow-700"
                  :disabled="projectStore.nodes.length == 0">Warm up cache
          </Button>
        </div>
      </Card>
    </div>


    <div>
      <h2 class="font-semibold text-xl">Available nodes</h2>
    </div>
    <Input placeholder="Search..." v-model="projectStore.search"/>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card v-for="node in projectStore.filteredNodes" :key="node.id">
        <div class="h-64 bg-gray-100 rounded-t-xl flex justify-center items-center">
          <LoaderCircle class="animate-spin" v-if="node.queued"/>
          <span class="text-xs italic text-gray-500" v-if="!node.queued && !node.available">Not available yet</span>
          <img :src="Config.serverUrl+'/asset/'+node.id+'.png'" v-if="!node.queued && node.available" :alt="node.name"
               class="h-64 object-contain">
        </div>
        <div class="">
          <Button @click="viewInFigma(projectStore.project, node)" variant="link" class="cursor-pointer">{{
              node.name
            }}
          </Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>
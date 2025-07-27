<script setup lang="ts">
import Layout from "@/views/Layout.vue";
import {useRoute} from "vue-router";

const route = useRoute();
</script>

<template>
  <router-view v-if="route.fullPath.includes('login')"/>
  <Layout v-else/>
</template>


<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Prueba Técnica - Alejandro Dubón</q-toolbar-title>
        <a href="https://github.com/DubAvenXP/tests-app-backend" target="_blank">
          <q-btn flat dense round size="18px" icon="lab la-github">
            <q-tooltip class="bg-secondary text-subtitle2"> Backend </q-tooltip>
          </q-btn>
        </a>
        <a href="https://github.com/DubAvenXP/tests-app-frontend" target="_blank">
          <q-btn flat dense round size="18px" icon="lab la-github">
            <q-tooltip class="bg-secondary text-subtitle2"> Frontend </q-tooltip>
          </q-btn>
        </a>
        <router-link :to="{ name: 'tests' }">
          <q-btn flat dense round size="18px" icon="home" />
        </router-link>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    return {};
  },
});
</script>

<style lang="sass">
a
  color: white
  text-decoration: none
</style>

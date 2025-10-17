<template>
  <UpdatesCheck v-if="$q.platform.is.capacitor" />
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

import UpdatesCheck from './components/updates-check.vue';
const $q = useQuasar();
</script>

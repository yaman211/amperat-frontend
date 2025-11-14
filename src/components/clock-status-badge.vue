<template>
  <q-badge
    :color="clock.status === ClockStatus.ACTIVE ? 'green-6' : 'red-6'"
    align="top"
    class="q-pa-sm rounded-sm"
    >الحالة: {{ clock.status === ClockStatus.ACTIVE ? 'فعالة' : 'غير فعالة' }}</q-badge
  >
</template>

<script lang="ts" setup>
import { Clock, ClockStatus } from 'src/models/clock.model';

defineProps<{
  clock: Clock;
}>();
</script>

<template>
  <q-page>
    <Loader v-if="clockDetailsStore.loading" />

    <div class="q-pa-sm">
      <q-infinite-scroll @load="onLoadReadings" :offset="100">
        <div class="q-px-md">
          <q-card
            v-for="(reading, idx) in clockDetailsStore.readings"
            :key="reading.id"
            class="q-pa-md rounded-lg"
            :class="idx !== 0 ? 'q-mt-md' : ''"
          >
            <div class="row q-col-gutter-md">
              <div class="flex items-center col-12 col-sm-6 col-md-4">
                <div
                  class="q-pa-md rounded-lg justify-center items-center"
                  style="background-color: #0094ce20"
                >
                  <q-icon name="electric_bolt" size="20px" color="primary" />
                </div>
                <div class="q-pl-md">
                  <div class="text-grey-6">الاستهلاك</div>
                  <div class="font-weight-medium text-subtitle1">{{ reading.consuming }} كيلو</div>
                </div>
              </div>

              <div class="flex items-center col-12 col-sm-6 col-md-4">
                <div
                  class="q-pa-md rounded-lg justify-center items-center"
                  style="background-color: #0094ce20"
                >
                  <q-icon name="pin" size="20px" color="black" />
                </div>
                <div class="q-pl-md">
                  <div class="text-grey-6">التأشيرة</div>
                  <div class="font-weight-medium text-subtitle1">
                    {{ reading.readingNumber }}
                  </div>
                </div>
              </div>

              <div class="flex items-center col-12 col-sm-6 col-md-4">
                <div
                  class="q-pa-md rounded-lg justify-center items-center"
                  style="background-color: #0094ce20"
                >
                  <q-icon name="schedule" size="20px" color="black" />
                </div>
                <div class="q-pl-md">
                  <div class="text-grey-6">التاريخ</div>
                  <div class="font-weight-medium text-subtitle1">
                    {{ dateFormatter(reading.createdAt as Date) }}
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>

        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import Loader from 'src/components/loader.vue';
import { onMounted, onUnmounted } from 'vue';
import { useClockDetailsStore } from '../../shared/clock-details/store';
import { dateFormatter } from 'src/utils/date';
import { useRoute } from 'vue-router';

const props = defineProps<{
  publicId?: string;
}>();

const clockDetailsStore = useClockDetailsStore();

const onLoadReadings = async (page: number, done: (d: boolean) => void) => {
  if (props.publicId) {
    await clockDetailsStore.fetchClockReadingsByPublicId(props.publicId, page - 1);
  }
  done(clockDetailsStore.readings.length === clockDetailsStore.readingsCount);
};

onUnmounted(() => {
  clockDetailsStore.$reset();
});

onMounted(async () => {
  if (props.publicId) {
    clockDetailsStore.fetchClockReadingsByPublicId(props.publicId, 0, true);
  }
});
</script>

<style lang="scss" scoped></style>

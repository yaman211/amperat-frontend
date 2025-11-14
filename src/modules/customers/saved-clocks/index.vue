<template>
  <q-page class="q-pb-md">
    <template v-if="!customersStore.savedClocks.length">
      <div class="column justify-center items-center">
        <div
          class="q-pa-md justify-center items-center q-mb-sm bg-grey-4"
          style="border-radius: 100%; width: fit-content; margin-top: 30vh"
        >
          <q-icon name="add" size="50px" color="grey-8" />
        </div>
        <div class="text-subtitle1 text-weight-medium q-my-sm">لا توجد ساعات محفوظة</div>
        <div class="text-grey-8">ابدأ بإضافة أول ساعة</div>
        <q-btn
          label="إضافة ساعة جديدة"
          color="primary"
          class="rounded-md q-mt-md"
          @click="onAddSavedClock"
        />
      </div>
    </template>
    <div class="column q-gutter-md" v-else>
      <q-btn
        label="إضافة ساعة جديدة"
        color="primary"
        class="rounded-md q-mt-md"
        icon="add"
        @click="onAddSavedClock"
      />
      <q-card
        v-for="clock in customersStore.savedClocks"
        :key="clock.id"
        class="q-pa-md rounded-lg cursor-pointer"
        @click="goToDetails(clock)"
      >
        <div class="row justify-between">
          <div class="row q-gutter-md">
            <div class="q-pa-md rounded-lg justify-center items-center q-mb-sm bg-primary">
              <q-icon name="electric_bolt" size="25px" color="white" />
            </div>
            <div>
              <div class="text-subtitle-1 text-wight-medium">
                اسم المشترك: {{ clock.ownerName }}
              </div>
              <div class="text-grey-6">رقم الساعة: {{ clock.id }}</div>
            </div>
          </div>
          <div>
            <q-btn icon="more_vert" flat size="sm" class="q-px-none" @click.stop>
              <q-menu
                class="rounded-md"
                style="
                  box-shadow:
                    0 4px 24px rgba(0, 0, 0, 0.1),
                    0 1.5px 4px rgba(0, 0, 0, 0.08);
                "
              >
                <q-list style="min-width: 200px">
                  <div
                    v-close-popup
                    class="row q-gutter-sm q-py-md q-px-sm"
                    @click="onRemove(clock)"
                  >
                    <q-icon name="delete" color="red-8" size="20px" />
                    <div class="text-red-8">حذف الساعة</div>
                  </div>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>

        <div class="q-mt-md bg-grey-1 q-pa-sm rounded-md">
          <div class="row justify-between items-start">
            <div>
              <div>الاستهلاك الحالي</div>
              <q-skeleton
                v-if="customersStore.loading"
                type="text"
                width="200px"
                height="32px"
                class="rounded-sm"
              />
              <div class="text-h6 text-primary" v-else>
                {{ formatConsuming(clock.consuming) }}
              </div>
            </div>
            <q-skeleton
              v-if="customersStore.loading"
              type="QBadge"
              class="rounded-sm q-pa-sm"
              width="45px"
              height="24px"
            />
            <q-badge
              v-else
              :color="clock.status === ClockStatus.ACTIVE ? 'green-7' : 'red-7'"
              align="top"
              class="q-pa-sm rounded-sm"
              >{{ clock.status === ClockStatus.ACTIVE ? 'فعالة' : 'غير فعالة' }}</q-badge
            >
          </div>
        </div>

        <!-- <div class="q-mt-md bg-blue-1 q-pa-sm rounded-md">
          <div class="row justify-between items-center">
            <div class="row items-center q-gutter-sm">
              <q-icon name="notifications" color="primary" size="20px" />
              <div class="text-subtitle1 text-primary">الإشعارات</div>
            </div>
            <q-toggle
              :model-value="clock.notificationsEnabled"
              @update:model-value="(value) => clock.updateNotificationsEnabled(value)"
              color="primary"
            />
          </div>
        </div> -->
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useCustomersStore } from '../store';
import { Clock, ClockStatus } from 'src/models/clock.model';
import { formatConsuming } from 'src/utils';

const $q = useQuasar();
const router = useRouter();

const customersStore = useCustomersStore();

customersStore.refreshSavedClocks();

if (!$q.platform.is.capacitor) {
  router.push('/auth/login');
}

const onAddSavedClock = () => {
  router.push({ path: '/shared/clock-qr-scan', query: { withSave: 'true' } });
};

const goToDetails = (clock: Clock) => {
  router.push({ path: `/customers/clock-details/public/${clock.publicId}` });
};

const onRemove = (clock: Clock) => {
  $q.dialog({
    title: 'حذف ساعة محفوظة',
    message: `هل انت متأكد من ازالة الساعة من قائمة الساعات المحفوظة ؟`,
    ok: {
      color: 'negative',
    },
    cancel: {},
  }).onOk(function () {
    customersStore.removeSavedClock(clock);
  });
};
</script>

<style lang="scss" scoped></style>

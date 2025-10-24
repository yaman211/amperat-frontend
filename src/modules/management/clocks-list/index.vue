<template>
  <q-page padding>
    <div class="row items-center q-mb-sm">
      <div class="col">
        <h2>قائمة الساعات</h2>
      </div>
    </div>
    <q-card class="q-mb-md q-pa-md rounded-md">
      <div class="row items-center q-mb-md">
        <q-icon name="filter_alt" color="primary" size="32px" class="q-mr-sm" />
        <div class="text-h5 text-primary">الفلاتر</div>
      </div>
      <div class="row q-col-gutter-md">
        <q-input
          v-model="filters.ownerName"
          label="اسم المالك"
          filled
          dense
          class="col-12 col-md-3"
          :debounce="750"
        />
        <q-select
          label="الاستهلاك"
          v-model="filters.consuming"
          :options="consumingOptions"
          filled
          dense
          class="col-12 col-md-2"
          :debounce="750"
          clearable
        />
        <!-- <q-input
          v-model.number="filters.minConsuming"
          type="number"
          label="الحد الأدنى للاستهلاك"
          filled
          dense
          class="col-12 col-md-2"
          :debounce="750"
        />
        <q-input
          v-model.number="filters.maxConsuming"
          type="number"
          label="الحد الأعلى للاستهلاك"
          filled
          dense
          class="col-12 col-md-2"
          :debounce="750"
        /> -->
        <sector-select
          v-model="filters.sectorId"
          class="col-12 col-md-2"
          :clearable="true"
          dense
          withoutValidation
          :debounce="750"
        />
        <box-select
          v-model="filters.boxId"
          class="col-12 col-md-2"
          :clearable="true"
          :sector-id="filters.sectorId"
          dense
          withoutValidation
          :debounce="750"
        />
        <div v-if="!$q.platform.is.capacitor">
          <q-btn
            label="تصدير البيانات"
            icon="ios_share"
            color="primary"
            size="md"
            :loading="exportLoading"
            @click="exportPdf"
          />
        </div>
      </div>
    </q-card>
    <q-table
      :rows="clocks"
      :loading="loading"
      :columns="columns"
      :filter="filters"
      row-key="id"
      :grid="viewMode !== 'table'"
      v-model:pagination="pagination"
      @request="onRequest"
      class="rounded-md"
      style="
        box-shadow:
          0 4px 24px rgba(0, 0, 0, 0.1),
          0 1.5px 4px rgba(0, 0, 0, 0.08);
      "
    >
      <template v-slot:top>
        <div class="">
          <q-btn
            dense
            flat
            round
            :color="viewMode === 'table' ? 'primary' : 'grey-4'"
            icon="table_view"
            @click="viewMode = 'table'"
            :aria-label="'عرض الجدول'"
          />
          <q-btn
            dense
            flat
            round
            :color="viewMode !== 'table' ? 'primary' : 'grey-4'"
            icon="view_module"
            @click="viewMode = 'grid'"
            :aria-label="'عرض البطاقات'"
          />
        </div>
      </template>
      <template v-slot:item="props">
        <q-card
          class="q-ma-xs cursor-pointer rounded-md"
          style="min-width: 260px; max-width: 320px; width: 100%"
        >
          <q-card-section class="q-pa-md" style="border-radius: 18px">
            <div class="text-h6 q-mb-xs">{{ props.row.ownerName }}</div>
            <div class="row items-center q-mb-xs">
              <q-icon name="bolt" class="q-mr-xs" color="amber" />
              <span class="text-subtitle2">الاستهلاك:</span>
              <span class="q-ml-xs">{{ props.row.consuming }}</span>
            </div>
            <div class="row items-center q-mb-xs">
              <q-icon name="location_on" class="q-mr-xs" color="blue" />
              <span class="text-subtitle2">القطاع:</span>
              <span class="q-ml-xs">{{ props.row.box?.sector?.name || '--' }}</span>
            </div>
            <div class="row items-center">
              <q-icon name="inventory_2" class="q-mr-xs" color="teal" />
              <span class="text-subtitle2">رقم العلبة:</span>
              <span class="q-ml-xs">{{ props.row.box?.boxNumber || '-' }}</span>
            </div>
            <div class="row items-center">
              <q-icon name="check_circle" class="q-mr-xs" color="green" />
              <span class="text-subtitle2">الحالة:</span>
              <span
                class="q-ml-xs"
                :class="props.row.status === ClockStatus.ACTIVE ? 'text-primary' : 'text-negative'"
                >{{ $t(`clockStatus.${props.row.status}`) }}</span
              >
            </div>
          </q-card-section>
          <q-card-actions align="right" class="q-pa-sm">
            <q-btn
              flat
              dense
              round
              icon="visibility"
              color="primary"
              @click="$router.push(`/shared/clock-details/${props.row.id}`)"
              :aria-label="'عرض'"
              class="q-mr-xs"
            />

            <q-btn
              flat
              dense
              round
              icon="add_chart"
              color="green"
              @click="$router.push(`/management/new-reading?clockId=${props.row.id}`)"
              :aria-label="'إضافة قراءة'"
              class="q-mr-xs"
            />
            <q-btn
              flat
              dense
              round
              icon="receipt_long"
              color="orange"
              @click="$router.push(`/management/pay-invoice?clockId=${props.row.id}`)"
              :aria-label="'إضافة فاتورة'"
            />
            <q-btn
              flat
              dense
              round
              icon="edit"
              color="secondary"
              @click="$router.push(`/shared/clock-edit/${props.row.id}`)"
              :aria-label="'تعديل'"
              class="q-mr-xs"
            />
          </q-card-actions>
        </q-card>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <div :class="props.row.status === ClockStatus.ACTIVE ? 'text-primary' : 'text-negative'">
            {{ $t(`clockStatus.${props.row.status}`) }}
          </div>
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            dense
            round
            icon="visibility"
            color="primary"
            @click="$router.push(`/shared/clock-details/${props.row.id}`)"
            :aria-label="'عرض'"
            class="q-mr-xs"
          />
          <q-btn
            flat
            dense
            round
            icon="add_chart"
            color="green"
            @click="$router.push(`/management/new-reading?clockId=${props.row.id}`)"
            :aria-label="'إضافة قراءة'"
            class="q-mr-xs"
          />
          <q-btn
            flat
            dense
            round
            icon="receipt_long"
            color="orange"
            @click="$router.push(`/management/pay-invoice?clockId=${props.row.id}`)"
            :aria-label="'إضافة فاتورة'"
          />
          <q-btn
            flat
            dense
            round
            icon="edit"
            color="secondary"
            @click="$router.push(`/shared/clock-edit/${props.row.id}`)"
            :aria-label="'تعديل'"
            class="q-mr-xs"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { api } from 'src/boot/axios';
import SectorSelect from 'src/modules/management/sectors/components/sector-select.vue';
import BoxSelect from 'src/modules/management/boxes/components/box-select.vue';
import { ClockStatus } from 'src/models/clock.model';
import { useRoute } from 'vue-router';
import { useQuasar } from 'quasar';

const route = useRoute();

const clocks = ref<any[]>([]);
const loading = ref<boolean>(false);
const exportLoading = ref<boolean>(false);
const filters = ref({
  ownerName: undefined,
  // minConsuming: undefined,
  // maxConsuming: undefined,
  sectorId: route.query.sectorId || undefined,
  boxId: route.query.boxId || undefined,
  consuming: undefined,
});

const $q = useQuasar();

const consumingOptions = [
  {
    label: 'تم الدفع مسبقاً',
    value: '1',
  },
  {
    label: 'عليها كسر',
    value: '2',
  },
];

const pagination = ref({
  page: 1,
  rowsPerPage: 25,
  rowsNumber: 100,
});
const viewMode = ref('table');

const columns = [
  { name: 'ownerName', label: 'اسم المالك', field: 'ownerName', align: 'left' as const },
  {
    name: 'consuming',
    label: 'الاستهلاك',
    field: (clock: any) => {
      return clock.consuming < 0
        ? `${-clock.consuming} كيلو مسبق`
        : clock.consuming == 0
          ? 'لا يوجد'
          : `${clock.consuming} كيلو كسر`;
    },
    align: 'left' as const,
  },
  {
    name: 'sectorName',
    label: 'القطاع',
    field: (row: any) => row.box?.sector?.name || '--',
    align: 'left' as const,
  },
  {
    name: 'boxNumber',
    label: 'رقم العلبة',
    field: (row: any) => row.box?.boxNumber || '--',
    align: 'left' as const,
  },
  {
    name: 'status',
    label: 'الحالة',
    align: 'left' as const,
  },
  {
    name: 'actions',
    label: 'العمليات',
    align: 'left' as const,
  },
];

const lastRequestParams = ref({});

const onRequest = async (params: any) => {
  const filters = { ...params.filter };
  if (filters.consuming?.value === '1') {
    filters.maxConsuming = 0;
  } else if (filters.consuming?.value === '2') {
    filters.minConsuming = 1;
  }
  delete filters.consuming;
  loading.value = true;
  try {
    const limit = params.pagination.rowsPerPage;
    const offset = limit * (params.pagination.page - 1) || undefined;
    console.log({ limit, offset });

    const queryParams = {
      limit,
      offset,
      ...(filters || {}),
    };
    lastRequestParams.value = queryParams;

    const { data } = await api.get('/clocks/list', {
      params: queryParams,
    });
    // console.log(data);
    clocks.value = data.rows;
    pagination.value = {
      ...pagination.value,
      rowsNumber: data.count,
    };
  } finally {
    loading.value = false;
  }
};

const exportPdf = async () => {
  exportLoading.value = true;
  try {
    const response = await api.get('/clocks/export', {
      params: lastRequestParams.value,
      responseType: 'blob', // IMPORTANT: receive binary data
    });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `الساعات - ${new Date().toLocaleDateString('en', { timeZone: 'Asia/Riyadh' })} - ${new Date().toLocaleTimeString('en', { timeZone: 'Asia/Riyadh' })}.pdf`;
    link.click();
    window.URL.revokeObjectURL(link.href);
    // console.log({ data });
  } finally {
    exportLoading.value = false;
  }
};

onRequest({ pagination: pagination.value, filter: filters.value });
</script>

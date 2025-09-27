<template>
  <div>
    <q-card class="q-pa-md rounded-md column q-gutter-sm">
      <div class="text-weight-bold">
        أهلاً وسهلاً بك يا
        <span class="text-primary"> {{ authStore.user?.fullName }}</span>
      </div>
      <div class="text-weight-bold" v-if="authStore.user?.vendor">
        أنت تعمل حالياً لدى
        <span class="text-primary">{{ authStore.user?.vendor.name }} </span>
      </div>
      <div class="text-weight-bold" v-if="authStore.user?.vendor">
        العمل الحالي
        <span class="text-primary">{{ $t(`userRoles.${authStore.user?.role}`) }} </span>
      </div>
    </q-card>
    <q-banner class="bg-primary rounded-md text-white q-mt-md" v-if="authStore.user?.myInvite">
      لديك دعوة من {{ authStore.user?.myInvite.vendor.name }} للعمل كـ
      {{ $t(`userRoles.${authStore.user?.myInvite.role}`) }}
      <template v-slot:action>
        <q-btn
          outline
          color="white"
          label="قبول"
          @click="inviteRespond(InviteStatus.ACCEPTED)"
          :loading="inviteLoading"
        />
        <q-btn
          outline
          color="white"
          label="رفض"
          @click="inviteRespond(InviteStatus.REJECTED)"
          :loading="inviteLoading"
        />
      </template>
    </q-banner>
    <div class="q-mt-lg text-h5">الخيارات المتاحة :</div>
    <div
      class="q-my-lg text-white"
      :class="$q.platform.is.desktop ? 'row' : 'column q-gutter-md'"
      :style="$q.platform.is.desktop ? '' : ''"
    >
      <div
        v-for="(action, i) in allowedActions"
        :key="i"
        :class="$q.platform.is.desktop ? 'col-3 q-pa-sm' : ''"
      >
        <q-card
          flat
          bordered
          class="rounded-lg q-pa-md bg-primary text-white cursor-pointer"
          @click="action.handler()"
        >
          <div class="column justify-center items-center">
            <div
              class="q-pa-md rounded-lg justify-center items-center q-mb-sm"
              style="background-color: #fff3"
            >
              <q-icon :name="action.icon" size="25px" color="white" />
            </div>
            <div class="text-h6 text-center">{{ action.name }}</div>
            <!-- <div class="text-caption text-center">عرض تفاصيل استهلاك الكهرباء والفواتير</div> -->
          </div>
        </q-card>

        <!-- <q-card
          class="q-pa-md rounded-md column justify-center items-center q-gutter-x-sm cursor-pointer"
          @click="action.handler()"
          style="background: #0094ce"
        >
          <q-icon :name="action.icon" size="60px" />
          <div class="text-weight-bold text-h6">{{ action.name }}</div>
        </q-card> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { Invite, InviteStatus } from 'src/models/invite.model';
import { useAuthStore } from 'src/modules/auth/store';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore();
const inviteLoading = ref(false);
const $q = useQuasar();

const inviteRespond = async (status: InviteStatus.ACCEPTED | InviteStatus.REJECTED) => {
  inviteLoading.value = true;
  try {
    await authStore.user?.myInvite?.respondToInvite(status);
    if (authStore.user) authStore.user.myInvite = null;
    if (status === InviteStatus.ACCEPTED) await authStore.refreshUser();
  } finally {
    inviteLoading.value = false;
  }
};

onMounted(async () => {
  const invite = await Invite.getMyInvite();
  if (authStore.user) authStore.user.myInvite = invite;
});

const actions = [
  {
    name: 'قائمة ساعاتك',
    icon: 'sticky_note_2',
    handler: () => {
      router.push('/shared/clocks-list');
    },
    can: () => false,
  },
  {
    name: 'قائمة الساعات',
    icon: 'sticky_note_2',
    handler: () => {
      router.push('/management/clocks-list');
    },
    can: () => authStore.user?.isManager || authStore.user?.isAccountant,
  },
  {
    name: 'استعراض بيانات ساعة',
    icon: 'article',
    handler: () => {
      router.push('/management/browse-clock');
    },
    can: () => authStore.user?.isManager || authStore.user?.isAccountant,
  },
  {
    name: 'إنشاء تأشيرة جديدة',
    icon: 'edit_calendar',
    handler: () => {
      router.push('/management/new-reading');
    },
    can: () => authStore.user?.isManager || authStore.user?.isEmployee,
  },
  {
    name: 'دفع فاتورة',
    icon: 'paid',
    handler: () => {
      router.push('/management/pay-invoice');
    },
    can: () => authStore.user?.isManager || authStore.user?.isAccountant,
  },
  {
    name: 'إنشاء ساعة جديدة',
    icon: 'note_add',
    handler: () => {
      router.push('/management/new-clock');
    },
    can: () => authStore.user?.isManager || authStore.user?.isAccountant,
  },
  {
    name: 'طباعة باركود',
    icon: 'qr_code_2',
    handler: () => {
      router.push('/management/print-barcode');
    },
    platform: () => $q.platform.is.desktop,
    can: () => authStore.user?.isManager || authStore.user?.isAccountant,
  },
  {
    name: 'إدارة العمال',
    icon: 'manage_accounts',
    handler: () => {
      router.push('/management/employees');
    },
    can: () => authStore.user?.isManager,
  },
  {
    name: 'دعوة عامل جديد',
    icon: 'perm_contact_calendar',
    handler: () => {
      router.push('/management/invite-user');
    },
    can: () => authStore.user?.isManager,
  },
  {
    name: 'تعديل المولدة',
    icon: 'settings',
    handler: () => {
      router.push('/management/edit-vendor');
    },
    can: () => authStore.user?.isManager,
  },
  {
    name: 'إحصائيات المولدات',
    icon: 'analytics',
    handler: () => {
      router.push('/statistics/governmental-dashboard');
    },
    can: () => authStore.user?.isGovernmental,
  },
  {
    name: 'القطاعات',
    icon: 'domain',
    handler: () => {
      router.push('/management/sectors');
    },
    can: () => authStore.user?.isManager,
  },
];

const allowedActions = computed(() => {
  return actions.filter((a) => a.can() && (!a.platform || a.platform()));
});
</script>

<style lang="scss" scoped></style>

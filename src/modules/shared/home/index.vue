<template>
  <div>
    <!-- Welcome Card -->
    <q-card class="welcome-card q-pa-lg rounded-xl relative-position overflow-hidden q-mb-lg">
      <div class="row items-center justify-between relative-position" style="z-index: 1">
        <div class="col-auto">
          <div class="text-grey-7 q-mb-xs">أهلاً وسهلاً بك</div>
          <div class="text-h5 text-weight-bold text-primary q-mb-sm">
            {{ authStore.user?.fullName }}
          </div>
          <div class="row q-gutter-sm">
            <q-badge
              v-if="authStore.user?.vendor"
              color="blue-1"
              text-color="primary"
              class="q-px-sm q-py-xs"
            >
              {{ authStore.user?.vendor.name }}
            </q-badge>
            <q-badge
              v-if="authStore.user?.role"
              color="blue-1"
              text-color="primary"
              class="q-px-sm q-py-xs"
            >
              {{ $t(`userRoles.${authStore.user?.role}`) }}
            </q-badge>
          </div>
        </div>
        <div class="col-auto">
          <q-btn flat color="grey-7" icon="logout" label="تسجيل الخروج" @click="logout" />
        </div>
      </div>
      <!-- Decorative background shape -->
      <div
        class="absolute-top-left bg-blue-1"
        style="
          width: 150px;
          height: 150px;
          border-radius: 50%;
          transform: translate(-30%, -30%);
          opacity: 0.5;
        "
      ></div>
    </q-card>

    <!-- Invite Banner -->
    <q-banner
      class="bg-primary rounded-xl text-white q-mb-xl shadow-2"
      v-if="authStore.user?.myInvite"
    >
      <div class="row items-center justify-between">
        <div class="text-h6">
          لديك دعوة من {{ authStore.user?.myInvite.vendor.name }} للعمل كـ
          {{ $t(`userRoles.${authStore.user?.myInvite.role}`) }}
        </div>
        <div class="q-gutter-sm">
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
        </div>
      </div>
    </q-banner>

    <!-- Sections -->
    <div v-for="(section, index) in visibleSections" :key="index" class="q-pb-xl">
      <div class="row items-center q-mb-md">
        <q-icon :name="section.icon" color="primary" size="24px" class="q-mr-sm" />
        <div class="text-h6 text-weight-bold text-grey-9">{{ section.title }}</div>
        <q-separator class="q-ml-md col" />
      </div>

      <div class="row q-col-gutter-md">
        <div v-for="(action, i) in section.items" :key="i" class="col-12 col-sm-6 col-md-3">
          <q-card
            flat
            bordered
            class="action-card cursor-pointer rounded-xl full-height transition-all"
            @click="action.handler()"
          >
            <q-card-section class="column items-center justify-center q-pa-lg full-height">
              <div
                class="icon-wrapper q-mb-md rounded-lg row items-center justify-center transition-all"
              >
                <q-icon :name="action.icon" size="32px" class="action-icon transition-all" />
              </div>
              <div class="text-h6 text-weight-bold text-center action-text transition-all">
                {{ action.name }}
              </div>
            </q-card-section>
          </q-card>
        </div>
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

const logout = async () => {
  await authStore.logout();
  router.push('/auth/login');
};

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

const sections = [
  {
    title: 'العدادات',
    icon: 'bolt',
    items: [
      {
        name: 'قائمة الساعات',
        icon: 'list_alt',
        handler: () => router.push('/management/clocks-list'),
        can: () => authStore.user?.isManager || authStore.user?.isAccountant,
      },
      {
        name: 'استعراض بيانات ساعة',
        icon: 'qr_code',
        handler: () => router.push('/management/browse-clock'),
        can: () => authStore.user?.isManager || authStore.user?.isAccountant,
      },
      {
        name: 'إنشاء ساعة جديدة',
        icon: 'add',
        handler: () => router.push('/management/new-clock'),
        can: () => authStore.user?.isManager || authStore.user?.isAccountant,
      },
      {
        name: 'طباعة باركود',
        icon: 'print',
        handler: () => router.push('/management/print-barcode'),
        platform: () => $q.platform.is.desktop,
        can: () => authStore.user?.isManager || authStore.user?.isAccountant,
      },
    ],
  },
  {
    title: 'الفواتير والتأشيرات',
    icon: 'receipt_long',
    items: [
      {
        name: 'قائمة الفواتير',
        icon: 'receipt',
        handler: () => router.push('/management/invoices-list'),
        can: () => authStore.user?.isManager || authStore.user?.isAccountant,
      },
      {
        name: 'دفع فاتورة',
        icon: 'credit_card',
        handler: () => router.push('/management/pay-invoice'),
        can: () => authStore.user?.isManager || authStore.user?.isAccountant,
      },
      {
        name: 'قائمة التأشيرات',
        icon: 'assignment',
        handler: () => router.push('/management/readings-list'),
        can: () => authStore.user?.isManager || authStore.user?.isAccountant,
      },
      {
        name: 'إنشاء تأشيرة جديدة',
        icon: 'note_add',
        handler: () => router.push('/management/new-reading'),
        can: () => authStore.user?.isManager || authStore.user?.isEmployee,
      },
    ],
  },
  {
    title: 'الإدارة',
    icon: 'people',
    items: [
      {
        name: 'معلومات المولدة',
        icon: 'settings',
        handler: () => router.push('/management/edit-vendor'),
        can: () => authStore.user?.isManager,
      },
      {
        name: 'القطاعات',
        icon: 'place',
        handler: () => router.push('/management/sectors'),
        can: () => authStore.user?.isManager,
      },
      {
        name: 'دعوة عامل جديد',
        icon: 'person_add',
        handler: () => router.push('/management/invite-user'),
        can: () => authStore.user?.isManager,
      },
      {
        name: 'إدارة العمال',
        icon: 'group',
        handler: () => router.push('/management/employees'),
        can: () => authStore.user?.isManager,
      },
      {
        name: 'المستخدمين',
        icon: 'manage_accounts',
        handler: () => router.push('/admin/users-list'),
        can: () => authStore.user?.isSuperAdmin,
      },
    ],
  },
  {
    title: 'التقارير',
    icon: 'analytics',
    items: [
      {
        name: 'الإحصائيات',
        icon: 'bar_chart',
        handler: () => router.push('/statistics/manager-dashboard'),
        can: () => authStore.user?.isManager,
      },
      {
        name: 'إحصائيات المولدات',
        icon: 'insights',
        handler: () => router.push('/statistics/governmental-dashboard'),
        can: () => authStore.user?.isGovernmental,
      },
    ],
  },
];

const visibleSections = computed(() => {
  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => item.can() && (!item.platform || item.platform())),
    }))
    .filter((section) => section.items.length > 0);
});
</script>

<style lang="scss" scoped>
.welcome-card {
  background: white;
  border: 1px solid #e0e0e0;
}

.transition-all {
  transition: all 0.3s ease;
}

.action-card {
  background: white;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;

  .icon-wrapper {
    width: 60px;
    height: 60px;
    background-color: #e3f2fd; // Light blue background
    border-radius: 12px;
    transition: all 0.3s ease;

    .action-icon {
      color: var(--q-primary);
      transition: all 0.3s ease;
    }
  }

  .action-text {
    color: #424242;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: var(--q-primary);
    border-color: var(--q-primary);
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .icon-wrapper {
      background-color: rgba(255, 255, 255, 0.2);

      .action-icon {
        color: white;
      }
    }

    .action-text {
      color: white;
    }
  }
}
</style>

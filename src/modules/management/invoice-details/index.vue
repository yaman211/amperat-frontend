<template>
  <div class="invoice-print" ref="content" style="position: relative">
    <q-img
      :src="require('src/assets/logo.svg')"
      style="
        opacity: 0.1;
        position: absolute;
        width: 30%;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    />
    <div class="invoice-header">
      <div class="q-mb-sm">
        <span class="invoice-title">مولدة {{ clock.vendor?.name || '--' }}</span>
      </div>
      <div class="invoice-date">
        رقم الفاتورة: <span>{{ invoice.id }}</span>
      </div>
      <div class="invoice-date">
        تاريخ الإنشاء: <span>{{ formatDate(invoice.createdAt) }}</span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="invoice-info">
      <div>
        <span class="label">اسم المالك:</span> <span>{{ clock.ownerName }}</span>
      </div>

      <div>
        <span class="label">رقم العداد:</span> <span>{{ clock.id }}</span>
      </div>
      <div>
        <span class="label">القطاع:</span> <span>{{ clock.box?.sector?.name || '--' }}</span>
      </div>
      <div>
        <span class="label">رقم العلبة:</span> <span>{{ clock.box?.boxNumber || '--' }}</span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="invoice-body">
      <div>
        <span class="label">الكمية المدفوعة:</span> <span>{{ invoice.consuming }} كيلو</span>
      </div>
      <div>
        <span class="label">القيمة المدفوعة:</span> <span>{{ invoice.price }}</span>
      </div>
      <div>
        <span class="label">رقم آخر تأشيرة:</span> <span>{{ invoice.lastReadingNumber }}</span>
      </div>
      <div>
        <span class="label">التأشيرة المدفوع لها:</span>
        <span>{{ invoice.paidUntilReadingNumber }}</span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="invoice-body">
      <div>
        <span class="label">النتيجة:</span>
        <span>{{ formatConsuming(invoice.consumingBeforeTheInvoice - invoice.consuming) }}</span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="footer-note text-center">
      <p>شكراً لزيارتكم</p>
    </div>
    <div class="invoice-footer">
      <q-btn color="primary" label="طباعة" @click="printInvoice" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Invoice } from 'src/models/invoice.model';
import { formatConsuming } from 'src/utils';

const props = defineProps<{ id: string }>();

const invoice = ref<any>({});
const clock = ref<any>({});
const content = ref<HTMLElement | null>(null);

const formatDate = (date: Date | string) => {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour12: false });
};

const fetchInvoice = async () => {
  const id = Number(props.id);
  const invoiceData = await Invoice.getInvoiceById(id);
  invoice.value = invoiceData;
  clock.value = invoiceData.clock;
};

const printInvoice = () => {
  if (!content.value) return;
  const cloned = content.value.cloneNode(true);
  document.body.appendChild(cloned);
  // @ts-ignore
  cloned.classList.add('printable');
  window.print();
  document.body.removeChild(cloned);
};

onMounted(fetchInvoice);
</script>

<style scoped>
.invoice-print {
  width: 320px;
  padding: 16px;
  background: #fff;
  font-size: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 24px auto;
  box-shadow: 0 2px 8px #eee;
}
.invoice-header {
  margin-bottom: 12px;
  text-align: center;
}
.invoice-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 4px;
}
.invoice-date {
  font-size: 14px;
  color: #888;
}
.divider {
  height: 1px;
  background: #eee;
  margin: 12px 0;
}
.invoice-info,
.invoice-body {
  margin-bottom: 8px;
}
.invoice-info div,
.invoice-body div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}
.label {
  font-weight: 500;
  color: #444;
}
.invoice-footer {
  text-align: center;
  margin-top: 16px;
}
</style>
<style scoped>
@media print {
  @page {
    size: 80mm 200mm;
    margin: 0;
  }
  .invoice-footer {
    display: none !important;
  }
}
</style>

<style>
@media print {
  body *:not(.printable, .printable *) {
    display: none;
  }
  .cell {
    break-inside: avoid;
  }
}
@page {
  margin: 0;
  size: 80mm 200mm;
}
</style>

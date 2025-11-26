export const formatConsuming = (consuming: number) => {
  if (consuming === 0) {
    return 'لا يوجد إستهلاك';
  }
  if (consuming > 0) {
    return `${consuming} كيلو كسر`;
  }
  if (consuming < 0) {
    return `${Math.abs(consuming)} كيلو مسبق`;
  }
};

export const commaFormatter = (num: number) => {
  if (!num) return num;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 2, // Ensure at most two decimal places
    }).format(num);
  } catch (err) {
    console.error(err);
    return num;
  }
};

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

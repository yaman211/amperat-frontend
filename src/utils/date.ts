const iso8601Regex =
  /^([+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([.,]\d+(?!:))?)?(\17[0-5]\d([.,]\d+)?)?([zZ]|([+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

export const isDate = (val: any): boolean => {
  if (val instanceof Date || (typeof val == 'string' && iso8601Regex.test(val))) {
    return true;
  }
  return false;
};

export const dateFormatter = (date: Date | string) => {
  if (!!date == false) console.warn('invalid date value', date);
  if (typeof date === 'string') date = new Date(date);
  const year = new Intl.DateTimeFormat('ar', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('ar', {
    month: 'numeric',
  }).format(date);
  const day = new Intl.DateTimeFormat('ar', { day: '2-digit' }).format(date);
  return `${day}/${month}/${year}`;
};

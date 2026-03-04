export function formatCurrencyVN(value: string) {
  value = value.replace(/\D/g, '');

  if (value === '') {
    return '';
  }
  return new Intl.NumberFormat('vi-VN').format(parseInt(value));
}

export function parseCurrencyVN(formatted: string) {
  return parseInt(formatted.replace(/[^0-9]/g, '')) || 0;
}

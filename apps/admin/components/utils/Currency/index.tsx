export default function Currency(value: any, currencyCode: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(
    value,
  );
}

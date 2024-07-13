export default function Status(status: string) {
  switch (status) {
    case 'PENDING':
      return 'alert';
    case 'OVERDUE':
      return 'alert';
    case 'PAID':
      return 'success';
    case 'SUCCESS':
      return 'success';
    default:
      return 'danger';
  }
}

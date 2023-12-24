export function formatNumber(number) {
  return new Intl.NumberFormat("ru-RU").format(number);
}

export function formatDate(date) {
  const day = date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

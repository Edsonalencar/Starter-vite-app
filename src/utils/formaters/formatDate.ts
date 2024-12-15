import dayjs, { Dayjs } from 'dayjs';

export const formatDate = (date?: string | Date | Dayjs, format = 'DD/MM/YYYY') => {
  if (!date) return '-';
  return dayjs(date).format(format);
};

export const formatFullDayAndMonth = (date?: string | Date | null) => {
  if (!date) return '-';
  return dayjs(date).format('dddd , DD [de] MMMM');
};

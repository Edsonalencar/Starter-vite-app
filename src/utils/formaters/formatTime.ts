import dayjs from 'dayjs';

export const formatTime = (date?: string | Date, plusMinutes: number = 0) => {
  if (!date) return '-';

  if (typeof date === 'string' && /^(\d{2}):(\d{2}):(\d{2})$/.test(date)) {
    return dayjs(`2000-01-01T${date}`)
      .add(plusMinutes, 'minutes')
      .format('HH:mm:ss');
  }

  return dayjs(date).add(plusMinutes, 'minutes').format('HH:mm:ss');
};

export const formatSimpleTime = (
  date?: string | Date,
  plusMinutes: number = 0,
) => {
  if (!date) return '-';

  if (typeof date === 'string' && /^(\d{2}):(\d{2}):(\d{2})$/.test(date)) {
    return dayjs(`2000-01-01T${date}`)
      .add(plusMinutes, 'minutes')
      .format('HH:mm');
  }

  return dayjs(date).add(plusMinutes, 'minutes').format('HH:mm');
};

export const formatDateAndTime = (
  date?: string | Date,
  plusMinutes: number = 0,
) => {
  if (!date) return '-';
  return dayjs(date)
    .add(plusMinutes, 'minutes')
    .format('DD [de] MMMM [de] YYYY [às] HH:mm');
};

export const formatTimeRange = (
  date1?: string | Date | null,
  date2?: string | Date | null,
) => {
  if (!date1 || !date2) return '-';
  return `${formatSimpleTime(date1)} até ${formatSimpleTime(date2)}`;
};

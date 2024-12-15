export type LocaleType = 'pt-BR' | 'en-US' | 'es-ES';

const formatPercentage = (
  value: number,
  locale: LocaleType = 'pt-BR',
  digits = 1,
) => {
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value / 100);
};

export { formatPercentage };

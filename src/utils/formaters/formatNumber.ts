export type LocaleType = 'pt-BR' | 'en-US' | 'es-ES';
export type CurrencyType = 'BRL' | 'USD' | 'EUR';

const formatNumber = (value: number, locale: LocaleType = 'pt-BR') => {
  return new Intl.NumberFormat(locale).format(value);
};

export { formatNumber };

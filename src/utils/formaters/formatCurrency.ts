export type LocaleType = 'pt-BR' | 'en-US' | 'es-ES';
export type CurrencyType = 'BRL' | 'USD' | 'EUR';

const formatCurrency = (
  value?: number,
  locale: LocaleType = 'pt-BR',
  currency: CurrencyType = 'BRL',
) => {
  if (!value || isNaN(value)) {
    return 'R$ 0,00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

export { formatCurrency };

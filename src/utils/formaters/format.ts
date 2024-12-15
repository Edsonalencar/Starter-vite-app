import { Address } from "@/types/authTypes";

export const formatCpfCnpj = (value?: string) => {
  if (!value || value == '') return undefined;

  try {
    if (!value) throw new Error('missing value');

    const replacedValue = value.replace(/\D/g, '');

    if (replacedValue.length <= 11) {
      return replacedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    return replacedValue
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  } catch (error: any) {
    console.warn('formatCpfCnpj:', error?.message);
    return '';
  }
};

export const formatCrp = (crp: string) => {
  let num = crp?.replace(/[^\d]/g, '');
  let len = num?.length;

  if (len <= 2) {
    crp = num;
  } else if (len <= 8) {
    crp = num?.replace(/(\d{2})(\d{1,4})/g, '$1/$2');
  } else {
    crp = num?.replace(/(\d{2})(\d{6})/g, '$1/$2');
  }

  return crp?.substring(0, 9);
};

export const formatCpf = (value?: string) => {
  try {
    if (!value) throw new Error('missing value');

    return value
      .replace(/\D+/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  } catch (error: any) {
    console.warn('formatCpf:', error?.message);
    return '';
  }
};

export const formatCnpj = (value: string) => {
  try {
    if (!value) throw new Error('missing value');

    return value
      .replace(/\D+/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  } catch (error: any) {
    console.warn('formatCnpj:', error?.message);
    return '';
  }
};

export const formatCep = (value: string) => {
  try {
    if (!value) throw new Error('missing value');

    return value
      .replace(/\D+/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{3})\d+?$/, '$1');
  } catch (error: any) {
    console.warn('formatCep:', error?.message);
    return '';
  }
};

export const formatPhone = (phone?: string | null) => {
  if (!phone) return '';
  let num = phone.replace(/[^\d]/g, '');
  let len = num.length;

  if (len <= 2) phone = num;
  else if (len <= 7) phone = num.replace(/(\d{2})(\d{1,5})/g, '($1) $2');
  else phone = num.replace(/(\d{2})(\d{5})(\d{1,4})/g, '($1) $2-$3');

  return phone.substring(0, 15);
};

export const formatTelephone = (value?: string) => {
  if (!value) return '';

  const replacedValue = value.replace(/\D/g, '');

  return replacedValue
    .replace(/(\d{2})(\d{4})(\d{1,4})/g, '($1) $2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');
};

export const formatTelephoneWithDdd = (value: string) => {
  try {
    if (!value) throw new Error('missing value');

    const replacedValue = value.replace(/\D/g, '');

    if (replacedValue.length < 11) {
      return replacedValue
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }

    return replacedValue
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  } catch (error: any) {
    console.warn('formatTelephone:', error?.message);
    return '';
  }
};

export const cleanMask = (value?: string) => {
  if (!value || value == '') return undefined;
  return value.replace(/\D/g, '');
};

export function formatToPercent(valor: number): string {
  const porcentagem = valor * 100;
  return porcentagem.toFixed(2) + '%';
}

export const shuffleArray = (array: string[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const getAddress = (address: Address) => {
  if (!address) return 'Não informado';

  return `${address?.city} - ${address?.state}`;
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getFileNameWithoutExtension = (fileName: string) => {
  return fileName.split('.').slice(0, -1).join('.');
};

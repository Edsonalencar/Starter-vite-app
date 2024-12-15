export function isValidUUID(uuid: string): boolean {
  const regex: RegExp =
    /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
  return regex.test(uuid);
}

export function isValidPhone(value: string) {
  if (!value) return false;
  var regex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return regex.test(value);
}

export function validateFormIsEmpty(data: any) {
  let verify = true;
  Object.keys(data).forEach((key) => {
    if (!data[key] || data[key] == '') verify = false;
  });
  return verify;
}

export function filterNonEmptyValues(data: any): any | null {
  const filteredData: any = {};

  Object.keys(data).forEach((key) => {
    if (data[key] && data[key] !== '') {
      filteredData[key] = data[key];
    }
  });

  // Se o objeto estiver vazio, retorne null
  return Object.keys(filteredData).length > 0 ? filteredData : null;
}

export function isBase64(str?: string) {
  if (!str || str === '' || str.trim() === '') return false;

  if (str.includes('data:image')) str = str.split(',')[1];

  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
}

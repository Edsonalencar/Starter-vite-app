export const formatFieldType = (type: string) => {
  switch (type) {
    case 'TEXT':
      return 'Texto';
    case 'NUMBER':
      return 'Número';
    case 'LIST':
      return 'Options';
    default:
      return 'Erro';
  }
};

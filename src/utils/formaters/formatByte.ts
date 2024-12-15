const bytesToMB = (bytes: number): number => {
  if (bytes < 0) {
    throw new Error('O valor em bytes não pode ser negativo.');
  }
  return parseFloat((bytes / (1024 * 1024)).toFixed(2));
};

const formatBytesToMB = (bytes: number): string => {
  const mb = bytesToMB(bytes);
  return `${mb} MB`;
};

export { formatBytesToMB };

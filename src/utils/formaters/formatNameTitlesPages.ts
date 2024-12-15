const formatNameTitlesPages = (name: string) => {
  switch (name) {
    case 'lancamentos':
      return 'lançamentos';
    case 'configuracoes':
      return 'configurações';
    default:
      return name;
  }
};

export { formatNameTitlesPages };

import { FC } from 'react';

import { Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import { formatCpfCnpj } from '@/utils/formaters/format';

export const InputCpfCnpj: FC<InputProps> = ({ onChange, ...rest }) => {
  return (
    <Input
      {...rest}
      onChange={(event) => {
        event.target.value = formatCpfCnpj(event.target?.value ?? '');

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
};

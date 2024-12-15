import { FC } from 'react';

import { Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import { formatCnpj } from '@/utils/formaters/format';

export const InputCnpj: FC<InputProps> = ({ onChange, ...rest }) => {
  return (
    <Input
      {...rest}
      onChange={(event) => {
        event.target.value = formatCnpj(event.target?.value ?? '');

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
};

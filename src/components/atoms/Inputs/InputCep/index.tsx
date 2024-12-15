import { FC } from 'react';

import { Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import { formatCep } from '@/utils/formaters/format';

export const InputCep: FC<InputProps> = ({ onChange, ...rest }) => {
  return (
    <Input
      {...rest}
      onChange={(event) => {
        event.target.value = formatCep(event.target?.value ?? '');

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
};

import { FC } from 'react';

import { Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import { formatCpf } from '@/utils/formaters/format';

export const InputCpf: FC<InputProps> = ({ onChange, ...rest }) => {
  return (
    <Input
      {...rest}
      onChange={(event) => {
        event.target.value = formatCpf(event.target?.value ?? '');

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
};

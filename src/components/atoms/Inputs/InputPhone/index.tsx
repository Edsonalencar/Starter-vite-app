import { FC } from 'react';

import { Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import { formatPhone } from '@/utils/formaters/format';

export const InputPhone: FC<InputProps> = ({ onChange, ...rest }) => {
  return (
    <Input
      {...rest}
      onChange={(event) => {
        event.target.value = formatPhone(event.target?.value ?? '');

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
};

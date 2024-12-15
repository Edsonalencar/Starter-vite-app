import { FC } from 'react';

import { Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import { formatTelephone } from '@/utils/formaters/format';

export const InputTelephone: FC<InputProps> = ({ onChange, ...rest }) => {
  return (
    <Input
      {...rest}
      onChange={(event) => {
        event.target.value = formatTelephone(event.target?.value ?? '');

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
};

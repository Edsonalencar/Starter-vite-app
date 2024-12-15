import { FC } from 'react';

import { Input } from 'antd';
import type { InputProps } from 'antd/es/input';
import { formatTelephoneWithDdd } from '@/utils/formaters/format';

export const InputTelephoneWithDdd: FC<InputProps> = ({
  onChange,
  ...rest
}) => {
  return (
    <Input
      {...rest}
      onChange={(event) => {
        event.target.value = formatTelephoneWithDdd(event.target?.value ?? '');

        if (!onChange) return;
        onChange(event);
      }}
    />
  );
};

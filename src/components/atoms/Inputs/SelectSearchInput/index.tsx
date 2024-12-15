import { ComponentProps } from 'react';
import { Button, Divider, Select } from 'antd';
import { AiOutlinePlus } from 'react-icons/ai';

interface SelectSearchInputProps extends ComponentProps<typeof Select> {
  placeholder: string;
  onAdd?: () => void;
}

export const SelectSearchInput = ({
  placeholder,
  onSearch,
  style,
  options,
  onAdd,
  ...rest
}: SelectSearchInputProps) => {
  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.label?.toLowerCase() ?? '').includes(input.toLowerCase())
      }
      filterSort={(optionA, optionB) =>
        (optionA?.label ?? '')
          .toLowerCase()
          .localeCompare((optionB?.label ?? '').toLowerCase())
      }
      options={options}
      dropdownRender={(menu) => (
        <>
          {menu}
          {onAdd && (
            <>
              <Divider style={{ margin: '8px 0' }} />
              <Button
                type="text"
                icon={<AiOutlinePlus size={12} />}
                style={{
                  color: '#3539A2',
                  fontWeight: 600,
                  width: '100%',
                }}
                onClick={onAdd}
              >
                Adicionar Novo
              </Button>
            </>
          )}
        </>
      )}
      {...rest}
    />
  );
};

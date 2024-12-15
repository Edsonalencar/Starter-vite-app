import { Address } from "@/types/authTypes";
import { formatCep } from "@/utils/formaters/format";
import { Descriptions } from "antd";

interface AddressDescriptionProps {
  address: Address;
}

export const AddressDescription: React.FC<AddressDescriptionProps> = ({
  address,
}) => {
  return (
    <Descriptions
      title="Endereço"
      layout="vertical"
      bordered
      column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}
    >
      {address.street && (
        <Descriptions.Item label="Rua">{address.street}</Descriptions.Item>
      )}
      {address.number && (
        <Descriptions.Item label="Número">{address.number}</Descriptions.Item>
      )}
      {address.cep && (
        <Descriptions.Item label="CEP">
          {formatCep(address.cep)}
        </Descriptions.Item>
      )}
      {address.city && (
        <Descriptions.Item label="Cidade">{address.city}</Descriptions.Item>
      )}
      {address.state && (
        <Descriptions.Item label="Estado">{address.state}</Descriptions.Item>
      )}
      {address.province && (
        <Descriptions.Item label="Província">
          {address.province}
        </Descriptions.Item>
      )}
      {address.complement && (
        <Descriptions.Item label="Complemento">
          {address.complement}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

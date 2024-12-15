import { useEffect } from "react";

import { Col, Form, FormProps, Input, InputNumber, Row, Select } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";

import { InputCep } from "@/components/atoms/Inputs/InputCep";

import { Address, User } from "@/types/authTypes";
import { stateOptions } from "@/utils/utils";

interface Props extends FormProps {
  address?: Address;
  required?: boolean;
  initialData?: User;
  inputSize?: SizeType;
}

export const AddressForm = ({
  address,
  layout = "vertical",
  required,
  initialData,
  inputSize,
  form,
  ...rest
}: Props) => {
  useEffect(() => {
    if (form && initialData?.profile?.address) {
      form.setFieldsValue({
        address: {
          cep: initialData.profile.address.cep,
          state: initialData.profile.address.state,
          city: initialData.profile.address.city,
          street: initialData.profile.address.street,
          number: initialData.profile.address.number,
          province: initialData.profile.address.province,
        },
      });
    }
  }, [initialData, form]);

  return (
    <>
      <Form layout={layout} form={form} {...rest}>
        <Row gutter={16}>
          <Col span={24} md={{ span: 6 }}>
            <Form.Item
              label="Cep"
              name={["address", "cep"]}
              rules={[{ required, message: "Campo obrigatório!" }]}
            >
              <InputCep placeholder="Digite o CEP" size={inputSize} />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 6 }}>
            <Form.Item
              label="Estado"
              name={["address", "state"]}
              rules={[{ required, message: "Campo obrigatório!" }]}
            >
              <Select
                showSearch
                size={inputSize}
                options={stateOptions}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label?.toLowerCase() ?? "").includes(
                    input.toLowerCase()
                  )
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 12 }}>
            <Form.Item
              label="Cidade"
              name={["address", "city"]}
              rules={[{ required, message: "Campo obrigatório!" }]}
            >
              <Input
                placeholder="Digite o nome da sua cidade"
                size={inputSize}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} md={{ span: 10 }}>
            <Form.Item
              label="Bairro"
              name={["address", "province"]}
              rules={[{ required, message: "Campo obrigatório!" }]}
            >
              <Input
                placeholder="Digite o nome do seu bairro"
                size={inputSize}
              />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 10 }}>
            <Form.Item
              label="Rua"
              name={["address", "street"]}
              rules={[{ required, message: "Campo obrigatório!" }]}
            >
              <Input placeholder="Digite o nome da sua rua" size={inputSize} />
            </Form.Item>
          </Col>
          <Col span={24} md={{ span: 4 }}>
            <Form.Item
              label="Número"
              name={["address", "number"]}
              rules={[{ required, message: "Campo obrigatório!" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Digite o número da sua casa"
                size={inputSize}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

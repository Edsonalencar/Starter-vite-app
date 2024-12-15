import { Profile, User, UserStatus } from "@/types/authTypes";
import { formatCpfCnpj, formatPhone } from "@/utils/formaters/format";
import { formatDate } from "@/utils/formaters/formatDate";
import { formatDateAndTime } from "@/utils/formaters/formatTime";
import { Descriptions } from "antd";

interface UserDetail extends Profile {
  email: string;
  status?: UserStatus;
  owner?: User;
}

interface Props {
  data: UserDetail;
}

export const ProfileWitchEmailDescription: React.FC<Props> = ({ data }) => {
  return (
    <Descriptions
      title="Apicultor"
      layout="vertical"
      bordered
      column={{ xxl: 4, xl: 3, lg: 2, md: 1, sm: 1, xs: 1 }}
    >
      {data.name && (
        <Descriptions.Item label="Nome">{data.name}</Descriptions.Item>
      )}

      <Descriptions.Item label="Status">{data.status}</Descriptions.Item>
      {data.email && (
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
      )}

      {data.document && (
        <Descriptions.Item label="Documento">
          {formatCpfCnpj(data.document)}
        </Descriptions.Item>
      )}
      {data.phone && (
        <Descriptions.Item label="Telefone">
          {formatPhone(data.phone)}
        </Descriptions.Item>
      )}
      {data.email && (
        <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
      )}
      {data.birthDate && (
        <Descriptions.Item label="Data de Nascimento">
          {formatDate(data.birthDate)}
        </Descriptions.Item>
      )}

      {data.owner && (
        <Descriptions.Item label="Responsável">
          {data.owner.profile?.name}
        </Descriptions.Item>
      )}

      {data.createdAt && (
        <Descriptions.Item label="Cadastrado Em">
          {formatDateAndTime(data.createdAt)}
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

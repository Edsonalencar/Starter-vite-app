import { Badge, Button, Flex, Popover, Tooltip } from "antd";
import { BsGear } from "react-icons/bs";

export const ConfigHeader: React.FC = () => {
  return (
    <Tooltip title="Configurações">
      <Popover
        content={
          <Flex justify="center" align="center" vertical className="w-52 p-2">
            <div className="text-xs">Nenhuma notificação</div>
          </Flex>
        }
        placement="bottomLeft"
        trigger={["click"]}
      >
        <Button
          type="text"
          className=" size-8 rounded-full"
          icon={<BsGear size={17} />}
        />
      </Popover>
    </Tooltip>
  );
};

import { Badge, Button, Flex, Popover, Tooltip } from "antd";
import { IoNotificationsOutline } from "react-icons/io5";


export const NotificationsHeader: React.FC = () => {
  return (
    <Tooltip title="Notificações">
      <Popover
        content={
          <Flex justify="center" align="center" vertical className="w-52 p-2">
            <div className="text-xs">Nenhuma notificação</div>
          </Flex>
        }
        placement="bottomLeft"
        trigger={["click"]}
      >
        <Button type="text" className=" size-8 rounded-full">
          <Badge count={0} size="small">
            <IoNotificationsOutline size={18} />
          </Badge>
        </Button>
      </Popover>
    </Tooltip>
  );
};

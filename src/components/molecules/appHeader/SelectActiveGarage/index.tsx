import { Button, Flex, Popover } from "antd";
import { HiOutlineChevronUpDown } from "react-icons/hi2";

export const SelectActiveGarage: React.FC = () => {
  return (
    <Popover
      content={
        <Flex justify="center" align="center" vertical>
          <div className="text-xs">Nenhuma notificação</div>
        </Flex>
      }
      placement="bottomLeft"
      trigger={["click"]}
    >
      <Button
        type="text"
        className=" rounded-md flex items-center gap-2 text-sm"
      >
        Oficina Dev
        <HiOutlineChevronUpDown size={20} />
      </Button>
    </Popover>
  );
};

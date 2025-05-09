import { BasePagination } from "@/components/atoms/BasePagination";
import { LoadingContent } from "@/components/atoms/LoadingContent";
import { Card, DatePicker, Flex, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export const DashboardPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [startAt, setStartAt] = useState(dayjs().startOf("month").toDate());
  const [endAt, setEndAt] = useState(dayjs().endOf("month").toDate());

  const { RangePicker } = DatePicker;
  const [page, setPage] = useState<number>(0);

  const navigate = useNavigate();

  return (
    <>
      <LoadingContent isLoading={loading} />
      <Flex gap={16} vertical>
        <RangePicker
          value={[dayjs(startAt), dayjs(endAt)]}
          onChange={(dates) => {
            if (dates && dates.length === 2) {
              setStartAt(dates[0]!.toDate());
              setEndAt(dates[1]!.toDate());
            }
          }}
          className="w-80"
          format="DD MMMM"
        />

        <Card
          title={
            <Flex justify="space-between">
              <Typography.Title level={5} className="whitespace-nowrap">
                Serviços
              </Typography.Title>
              <Flex gap={8}>
                <Search
                  placeholder="Pesquise um produto ou placa..."
                  allowClear
                  style={{ width: 304 }}
                />
              </Flex>
            </Flex>
          }
        >
          <Flex gap={20} vertical>
            <div></div>
          </Flex>
        </Card>
      </Flex>
    </>
  );
};

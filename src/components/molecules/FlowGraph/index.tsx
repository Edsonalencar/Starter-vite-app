import { Line, ColumnConfig } from "@ant-design/plots";
import { formatCurrency } from "@/utils/formaters/formatCurrency";

import { ItensGraph } from "@/services/dashboarService/dtos";

interface Props {
  data: ItensGraph[];
}

export default function FlowGraph({ data }: Props) {
  const config: ColumnConfig = {
    data,
    height: 300,
    xField: "day",
    yField: "value",
    colorField: "type",
    scale: { color: { range: ["#d9d9d9", "#3C8117", "#CC1248"] } },
    axis: {
      y: {
        labelFormatter: (v: any) => formatCurrency(Number(v)),
      },
    },
    tooltip: { channel: "y", valueFormatter: (d) => formatCurrency(Number(d)) },
  };

  return <Line {...config} />;
}

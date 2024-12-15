import { useMemo } from "react";

import { Pagination } from "antd";
import { twMerge } from "tailwind-merge";

import { Pageable } from "@/types";

interface Props {
  pageable?: Pageable<any>;
  page: number;
  setPage: (page: number) => void;
  className?: string;
  size?: "small" | "default";
}

export const BasePagination = ({
  pageable,
  page,
  setPage,
  size,
  className,
}: Props) => {
  const paginationConfig = useMemo(() => {
    return {
      showSizeChanger: false,
      pageSize: pageable?.size ?? 0,
      total: pageable?.totalElements ?? 0,
      current: page + 1,
      onChange(page: number) {
        setPage(page - 1);
      },
    };
  }, [pageable, page]);

  const startItem = page > 0 ? page * (pageable?.size || 0) + 1 : 1;
  const endItem =
    pageable && pageable.totalElements
      ? Math.min((page + 1) * pageable.size, pageable.totalElements)
      : 0;

  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-2 text-sm text-gray-500 max-xs:flex-col-reverse",
        className
      )}
    >
      {pageable && pageable.size > 1 && (
        <>
          <span>
            {pageable.totalElements === 0
              ? `De 0 a 0 de ${pageable.totalElements} itens`
              : pageable.totalElements === 1
              ? `De 1 a 1 de ${pageable.totalElements} item`
              : `Mostrando de ${startItem} a ${endItem} de ${pageable.totalElements} itens`}
          </span>
          <Pagination {...paginationConfig} size={size} />
        </>
      )}
    </div>
  );
};

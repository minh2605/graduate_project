import { useLoading } from "hooks/useLoading";
import { useState, useEffect, useMemo, useCallback } from "react";
import API from "api/axios";
import { DashboardTable } from "features/Admin/components/DashboardTable";
import { Column, Row } from "react-table";
import { TextCell } from "features/Admin/components/Cells/TextCell";
import { OptionMenuCell } from "features/Admin/components/Cells/OptionMenuCell";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import queryString from "query-string";
import SvgLeftArrow from "common/components/svg/LeftArrow";
import { PaginationControl } from "common/components/PaginationControl";
import { usePaginationFilter } from "hooks/usePaginationFilter";
import { PaginationInfoProps } from "features/Admin/pages/ManageProductsPage";
import { OrderStatus, PaymentType } from "features/Checkout/CheckoutForm";
import { Switch } from "@headlessui/react";

interface ProductOrderProps {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export interface OrderProps {
  _id: string;
  orderCode: string;
  account_id: string;
  order_type_id: string;
  product_list: ProductOrderProps[];
  total_gross_amount: number;
  total_net_amount: number;
  address: string;
  city: string[];
  date: string;
  order_note: string;
  status: OrderStatus;
  payment_type: PaymentType;
  isDelete: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface OrderPaginationProps {
  orderList: OrderProps[];
  currentPage: number;
  limit: number;
  totalProduct: number;
  totalPage: number;
}

export const ManageOrdersPage = (): JSX.Element => {
  const [orders, setOrders] = useState<OrderProps[]>();
  const [showLoading, hideLoading] = useLoading();
  const navigate = useNavigate();
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>({
    limit: 0,
    currentPage: 0,
    totalPage: 0,
    totalProduct: 0,
  });

  const [isArchived, setIsArchived] = useState(false);

  const [paginationFilter, setPaginationFilter] = usePaginationFilter({
    page: 1,
    limit: 5,
  });

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: OrderPaginationProps = await API.get(
        `/order/list?${queryString.stringify({
          ...paginationFilter,
          archived: isArchived,
        })}`
      );
      if (data) {
        setOrders(data.orderList);
        const paginationData: PaginationInfoProps = {
          limit: data.limit,
          currentPage: data.currentPage,
          totalPage: data.totalPage,
          totalProduct: data.totalProduct,
        };
        setPaginationInfo(paginationData);
      }
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading, paginationFilter, isArchived]);

  const handleRowDelete = useCallback(
    async (value: OrderProps, archive: boolean = true) => {
      try {
        showLoading();
        archive
          ? await API.post(`/order/delete/${value._id}`)
          : await API.delete(`/order/${value._id}`);
        setOrders((previous) => previous?.filter((it) => it._id !== value._id));
        hideLoading();
      } catch (error: any) {
        hideLoading();
        toast.error(error.message);
      }
    },
    [showLoading, hideLoading]
  );

  const handleRowEdit = useCallback(
    (value: OrderProps) => {
      const productId = value._id;
      navigate(`./detail/${productId}`);
    },
    [navigate]
  );

  const handleOrderRetrieve = useCallback(
    async (value: OrderProps) => {
      const orderId = value._id;
      try {
        showLoading();
        await API.put(`/order/retrieve/${orderId}`);
        setOrders((previous) => previous?.filter((it) => it._id !== value._id));
        hideLoading();
      } catch (error: any) {
        hideLoading();
        toast.error(error.message);
      }
    },
    [showLoading, hideLoading]
  );

  const columns = useMemo<Column<Partial<OrderProps>>[]>(() => {
    const baseColumns: Column<Partial<OrderProps>>[] = [
      {
        id: "code",
        Header: "Code",
        accessor: (order) => order.orderCode?.toUpperCase(),
        Cell: TextCell,
      },
      {
        id: "date",
        Header: "Receive time",
        accessor: (order) => order.date?.substring(0, 10),
        Cell: TextCell,
      },
      {
        id: "total",
        Header: "Order Bill",
        accessor: (order) => order.total_net_amount + "$",
        Cell: TextCell,
      },
      {
        id: "address",
        Header: "Address",
        accessor: (order) => order.address,
        Cell: TextCell,
      },
      {
        id: "city",
        Header: "City",
        accessor: (order) => order.city,
        Cell: TextCell,
      },
      {
        id: "status",
        Header: "Status",
        accessor: (order) => order.status,
        Cell: TextCell,
      },
      {
        id: "payment_type",
        Header: "Payment Type",
        accessor: (order) => order.payment_type,
        Cell: TextCell,
      },
    ];
    return baseColumns.concat({
      id: "menu",
      Header: "",
      accessor: (order) => order,
      Cell: ({ value }: { value: OrderProps }) => (
        <OptionMenuCell
          value={value}
          onDelete={handleRowDelete}
          onEdit={handleRowEdit}
          onRetrieve={handleOrderRetrieve}
          isArchived={isArchived}
        />
      ),
    });
  }, [handleRowDelete, handleRowEdit, handleOrderRetrieve, isArchived]);

  const handleRowSelected = (selectedRow: Row<Partial<OrderProps>>) => {
    const productId = selectedRow.original._id;
    navigate(`./detail/${productId}`);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const pageSelected = selectedItem.selected + 1;
    setPaginationFilter({
      ...paginationFilter,
      page: pageSelected,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between font-medium mb-6">
        <div className="text-h2">Manage Orders Page</div>
        <div className="flex items-center gap-4">
          <Switch
            checked={isArchived}
            onChange={setIsArchived}
            className={`${isArchived ? "bg-dark-red" : "bg-light-grey"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 `}
          >
            <span
              aria-hidden="true"
              className={`${isArchived ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <span
            className={`${
              isArchived ? "text-dark-red" : "text-light-grey"
            } transition-colors`}
          >
            Archived
          </span>
        </div>
      </div>
      <DashboardTable
        data={orders ?? []}
        columns={columns}
        onRowSelected={handleRowSelected}
        className="mb-10"
      />
      <PaginationControl
        previousLabel={<SvgLeftArrow />}
        nextLabel={<SvgLeftArrow className="rotate-180" />}
        pageCount={paginationInfo?.totalPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

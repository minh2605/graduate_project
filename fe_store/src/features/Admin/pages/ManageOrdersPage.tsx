import { useLoading } from "hooks/useLoading";
import { useState, useEffect, useMemo, useCallback } from "react";
import API from "api/axios";
import { DashboardTable } from "features/Admin/components/DashboardTable";
import { Column, Row } from "react-table";
import { TextCell } from "features/Admin/components/Cells/TextCell";
import { OptionMenuCell } from "features/Admin/components/Cells/OptionMenuCell";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "common/components/Button";
import SvgPlus from "common/components/svg/Plus";
import { ProductCreatePopup } from "features/Products/ProductCreatePopup";
import queryString from "query-string";
import SvgLeftArrow from "common/components/svg/LeftArrow";
import { PaginationControl } from "common/components/PaginationControl";
import { usePaginationFilter } from "hooks/usePaginationFilter";
import { PaginationInfoProps } from "features/Admin/pages/ManageProductsPage";
import { OrderStatus, PaymentType } from "features/Checkout/CheckoutForm";

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

  const [paginationFilter, setPaginationFilter] = usePaginationFilter({
    page: 1,
    limit: 5,
  });

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: OrderPaginationProps = await API.get(
        `/order/list?${queryString.stringify(paginationFilter)}`
      );
      setOrders(data.orderList);
      const paginationData: PaginationInfoProps = {
        limit: data.limit,
        currentPage: data.currentPage,
        totalPage: data.totalPage,
        totalProduct: data.totalProduct,
      };
      setPaginationInfo(paginationData);
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading, paginationFilter]);

  const handleRowDelete = useCallback(
    async (value: OrderProps) => {
      try {
        showLoading();
        await API.post(`/order/delete/${value._id}`);
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
        />
      ),
    });
  }, [handleRowDelete, handleRowEdit]);

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
        {/* <Button
          className="flex items-center gap-2"
          onClick={() => setShowPopup(true)}
        >
          <span>Create new product</span>
          <SvgPlus />
        </Button> */}
      </div>
      <DashboardTable
        data={orders?.filter((it) => !it.isDelete) ?? []}
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

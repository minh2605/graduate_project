import {
  OrderPaginationProps,
  OrderProps,
} from "features/Admin/pages/ManageOrdersPage";
import { useState, useEffect, useMemo } from "react";
import API from "api/axios";
import useAuth from "hooks/useAuth";
import { PaginationControl } from "common/components/PaginationControl";
import SvgLeftArrow from "common/components/svg/LeftArrow";
import { PaginationInfoProps } from "features/Admin/pages/ManageProductsPage";
import queryString from "query-string";

export const HistoryPage = (): JSX.Element => {
  const { currentUserProfile } = useAuth();
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>({
    limit: 5,
    currentPage: 0,
    totalPage: 0,
    totalProduct: 0,
  });

  const orderFilterUrl = useMemo(() => {
    const orderFilter = {
      page: paginationInfo.currentPage,
      limit: paginationInfo.limit,
    };
    return queryString.stringify(orderFilter);
  }, [paginationInfo.currentPage, paginationInfo.limit]);

  const [previousOrders, setPreviousOrders] = useState<OrderProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data: OrderPaginationProps = await API.get(
        `order/list/${currentUserProfile?.account_id}?${orderFilterUrl}`
      );
      setPreviousOrders(data.orderList);
      const paginationData: PaginationInfoProps = {
        limit: data.limit,
        currentPage: data.currentPage,
        totalPage: data.totalPage,
        totalProduct: data.totalProduct,
      };
      setPaginationInfo(paginationData);
    };
    fetchData();
  }, [currentUserProfile?.account_id, orderFilterUrl]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    const pageSelected = selectedItem.selected + 1;
    setPaginationInfo({
      ...paginationInfo,
      currentPage: pageSelected,
    });
  };

  return (
    <div>
      <div>
        <h2 className="text-h2 font-medium text-light-red mb-8">
          Your previous orders
        </h2>
      </div>
      <div>
        <table className="w-full text-center border rounded mb-5 max-h-56">
          <tr>
            <th className="p-4">Order date</th>
            <th>Total bill</th>
            <th>Products</th>
            <th>Receive</th>
          </tr>
          {previousOrders.map((order, index) => {
            return (
              <tr
                key={order._id}
                className={`${index % 2 === 0 ? "bg-light-red-opacity" : ""}`}
              >
                <td>
                  <span>{order.createdAt?.toString().slice(0, 10)}</span>
                </td>
                <td>
                  <span>{order.total_net_amount}</span>
                </td>
                <td>
                  <div>
                    {order.product_list.map((product) => {
                      return (
                        <div className="flex items-center gap-2 mb-2 justify-between px-10">
                          <div className="flex items-center flex-1 justify-center ">
                            <span>{product.quantity} X </span>
                            <span>{product.name}</span>
                          </div>
                          <div className="h-10 w-10">
                            <img
                              src={product.image}
                              alt="product-img"
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td>
                  <span>{order.date.toString().slice(0, 10)}</span>
                </td>
              </tr>
            );
          })}
        </table>
        <PaginationControl
          previousLabel={<SvgLeftArrow />}
          nextLabel={<SvgLeftArrow className="rotate-180" />}
          pageCount={paginationInfo?.totalPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

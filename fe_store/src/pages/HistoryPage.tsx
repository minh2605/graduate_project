import { OrderProps } from "features/Admin/pages/ManageOrdersPage";
import { useState, useEffect } from "react";
import API from "api/axios";
import useAuth from "hooks/useAuth";

export const HistoryPage = (): JSX.Element => {
  const { currentUserProfile } = useAuth();

  const [previousOrders, setPreviousOrders] = useState<OrderProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data: OrderProps[] = await API.get(
        `order/list/${currentUserProfile?.account_id}`
      );
      setPreviousOrders(data);
    };
    fetchData();
  }, [currentUserProfile?.account_id]);
  return (
    <div>
      <div>
        <h2 className="text-h2 font-medium text-light-red mb-8">
          Your previous orders
        </h2>
      </div>
      <div>
        <table className="w-full text-center border rounded">
          <tr>
            <th className="p-4">Order date</th>
            <th>Total bill</th>
            <th>Products</th>
            <th>Receive</th>
          </tr>
          {previousOrders.map((order, index) => {
            return (
              <tr
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
      </div>
    </div>
  );
};

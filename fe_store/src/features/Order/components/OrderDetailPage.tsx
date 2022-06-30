import { Button } from "common/components/Button";
import { useLoading } from "hooks/useLoading";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import API from "api/axios";
import { useParams } from "react-router-dom";
import { OrderProps } from "features/Admin/pages/ManageOrdersPage";

export const OrderDetailPage = (): JSX.Element => {
  const { orderId } = useParams();
  const [orderDetail, setOrderDetail] = useState<OrderProps>();
  const [showLoading, hideLoading] = useLoading();
  useEffect(() => {
    const fetchData = async (orderId: string) => {
      try {
        showLoading();
        const order: OrderProps = await API.get(`/order/${orderId}`);
        if (order) {
          order.date = order.date.substring(0, 10);
          setOrderDetail(order);
          hideLoading();
        }
      } catch (error: any) {
        hideLoading();
        toast.error(error.message);
      }
    };
    if (orderId) {
      fetchData(orderId);
    }
  }, [orderId, showLoading, hideLoading]);

  const handleEditOrder = async () => {
    try {
      showLoading();
      // await API.put(`/order/${orderId}`, formData);
      hideLoading();
      toast.success("Update product successfully");
    } catch (error: any) {
      hideLoading();
      toast.error(error.message);
    }
  };

  return (
    <div>
      {orderDetail && (
        <div>
          <div className="text-h2 mb-4">Edit Product</div>
          <div className="flex items-center gap-4">
            <span className="text-base font-bold">Order Code:</span>
            <span>{orderDetail.orderCode.toUpperCase()}</span>
          </div>
          <div className="grid grid-rows-3 grid-cols-3 gap-x-10 gap-y-8">
            <div className="col-span-2 border p-2 rounded">
              <span className="text-base font-bold">Products Section</span>
              <table className="w-full text-center border rounded">
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
                {orderDetail.product_list.map((product) => {
                  return (
                    <tr>
                      <td className="flex items-center gap-4 py-2 px-10">
                        <div className="w-16 h-16 p-2 rounded border overflow-hidden">
                          <img
                            src={product.image}
                            alt="product_img"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <span>{product.name}</span>
                      </td>
                      <td>
                        <span>{product.quantity}</span>
                      </td>
                      <td>
                        <span>${product.price}</span>
                      </td>
                      <td className="font-bold text-light-red">
                        <span>${product.price * product.quantity}</span>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <div className="col-span-1 border p-2 rounded">
              Order Preference
              <div>
                <span>PREFERRED DATE & TIME</span>
                <div>{orderDetail.date}</div>
              </div>
              <div>
                <span>Order Note</span>
                <div>{orderDetail.order_note}</div>
              </div>
            </div>
            <div className="col-span-2 border p-2 rounded">
              <span>Fee section</span>
              <div>
                <span>Address</span>
                <div>{orderDetail.total_gross_amount}</div>
                <div>{orderDetail.total_net_amount}</div>
              </div>
            </div>
            <div className="col-span-1 border p-2 rounded">
              <span>Customer</span>
              <div>
                <span>Address</span>
                <div>{orderDetail.city}</div>
                <div>{orderDetail.address}</div>
              </div>
            </div>
          </div>
          <Button
            className="flex items-center gap-4 justify-center w-1/2 m-auto"
            type="button"
            onClick={handleEditOrder}
          >
            <span>Save</span>
          </Button>
        </div>
      )}
    </div>
  );
};

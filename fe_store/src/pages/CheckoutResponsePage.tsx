import FoogleLogo from "assets/svg/foogle-logo.svg";
import { OrderProps } from "features/Admin/pages/ManageOrdersPage";
import { Link, useLocation, useParams } from "react-router-dom";
import API from "api/axios";
import { useEffect, useState } from "react";
import { useLoading } from "hooks/useLoading";
import { Button } from "common/components/Button";
import SvgLeftArrow from "common/components/svg/LeftArrow";

export const CheckoutResponsePage = (): JSX.Element => {
  const { orderId } = useParams();
  const search = useLocation().search;
  const success = new URLSearchParams(search).get("success");
  const [showLoading, hideLoading] = useLoading();
  const [orderInfo, setOrderInfo] = useState<OrderProps>();

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: OrderProps = await API.get(`/order/${orderId}`);
      setOrderInfo(data);
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading, orderId]);
  return (
    <div>
      {orderInfo ? (
        <div className="flex items-center justify-center">
          <div className="w-2/5 border rounded py-4 px-8 font-medium">
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded">
                <img
                  src={FoogleLogo}
                  alt="foogle-logo"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="mb-4 text-center">
              <h3 className="text-h3">
                {success ? "Your Order Confirmed!" : "Your Order Canceled!"}
              </h3>
              <span className="font-regular">
                {success
                  ? "Your order has been confirmed and will be shipped soon"
                  : "You has canceled your order"}
              </span>
            </div>
            {success && (
              <>
                <div className="flex items-center justify-between font-medium text-center p-2 border border-bottom mb-4">
                  <div>
                    <div className="text-light-grey">Order date</div>
                    <div>{orderInfo.createdAt?.toString().slice(0, 10)}</div>
                  </div>
                  <div>
                    <div className="text-light-grey">Receive date</div>
                    <div>{orderInfo.date?.toString().slice(0, 10)}</div>
                  </div>
                  <div>
                    <div className="text-light-grey">Payment</div>
                    <div>{orderInfo.payment_type}</div>
                  </div>
                  <div>
                    <div className="text-light-grey">Address</div>
                    <div>{orderInfo.address}</div>
                  </div>
                </div>
                <div>
                  {orderInfo.product_list &&
                    orderInfo.product_list.map((product) => (
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-20 h-20 rounded p-2 border">
                          <img
                            src={product.image}
                            alt="product-img"
                            className="h-full w-full"
                          />
                        </div>
                        <div>{product.name}</div>
                        <div>Qty {product.quantity}</div>
                        <div>${product.price}</div>
                      </div>
                    ))}
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span>Total</span>
                  <span className="text-light-red font-bold">
                    ${orderInfo.total_net_amount}
                  </span>
                </div>
              </>
            )}
            <div>
              {success && (
                <p className="font-regular mb-4">
                  We'll send your shipping confirmation when your item(s) are on
                  the way! We appreciate your business, and hope you enjoy your
                  purchase
                </p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <span>Thank you!</span>
                  <span className="font-regular">Foogle Store</span>
                </div>
                <div>
                  <Button>
                    <Link to="/" className="flex items-center gap-2">
                      <SvgLeftArrow />
                      <span>Back to home</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

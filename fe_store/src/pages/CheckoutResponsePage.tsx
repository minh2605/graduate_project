import { useLocation } from "react-router-dom";

export const CheckoutResponsePage = (): JSX.Element => {
  // const { orderId } = useParams();
  const search = useLocation().search;
  const success = new URLSearchParams(search).get("success");
  const cancel = new URLSearchParams(search).get("cancel");
  return (
    <div className="">
      {success && <h1>Checkout response page success</h1>}
      {cancel && <h1>Checkout response page fail</h1>}
    </div>
  );
};

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "api/axios";

type ProductTypeCellProps = {
  value: string;
};

export interface ProductTypeProps {
  _id: string;
  name: string;
  createdAt?: Date;
  updatedAt: Date;
}

export const ProductTypeCell = ({
  value,
}: ProductTypeCellProps): JSX.Element => {
  const [productTypeInfo, setProductTypeInfo] = useState<ProductTypeProps>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productType: ProductTypeProps = await API.get(
          `/product_type/${value}`
        );
        if (productType) {
          setProductTypeInfo(productType);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [value]);
  return (
    <div className="flex justify-center items-center h-full text-center text-sm">
      <p className="max-w-[140px] text-ellipsis overflow-hidden">
        {productTypeInfo?.name}
      </p>
    </div>
  );
};

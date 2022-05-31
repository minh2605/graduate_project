import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "api/axios";

type CategoryCellProps = {
  value: string;
};
interface CategoryProps {
  _id: string;
  name: string;
  productTypeId: string;
  description: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const CategoryCell = ({ value }: CategoryCellProps): JSX.Element => {
  const [categoryInfo, setCategoryInfo] = useState<CategoryProps>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const category: CategoryProps = await API.get(`/category/${value}`);
        if (category) {
          setCategoryInfo(category);
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
        {categoryInfo?.name}
      </p>
    </div>
  );
};

import { ProductProps } from "common/components/ProductCard";
import { useLoading } from "hooks/useLoading";
import { useState, useEffect, useMemo } from "react";
import API from "api/axios";
import { DashboardTable } from "features/Admin/components/DashboardTable";
import { Column } from "react-table";
import { TextCell } from "features/Admin/components/Cells/TextCell";
import { ImageCell } from "features/Admin/components/Cells/ImageCell";
import { CategoryCell } from "features/Admin/components/Cells/CategoryCell";
import { ProductTypeCell } from "features/Admin/components/Cells/ProductTypeCell";
import { OptionMenuCell } from "../components/Cells/OptionMenuCell";

export const ManageProductsPage = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProps[]>();
  const [showLoading, hideLoading] = useLoading();
  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: ProductProps[] = await API.get("/product/list");
      setProducts(data);
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading]);

  const columns = useMemo<Column<Partial<ProductProps>>[]>(() => {
    const baseColumns: Column<Partial<ProductProps>>[] = [
      {
        id: "code",
        Header: "Code",
        accessor: (product) => product.productCode,
        Cell: TextCell,
      },
      {
        id: "name",
        Header: "Name",
        accessor: (product) => product.name,
        Cell: TextCell,
      },
      {
        id: "price",
        Header: "Price",
        accessor: (product) => product.price + "$",
        Cell: TextCell,
      },
      {
        id: "category",
        Header: "Category",
        accessor: (product) => product.productCategoryId,
        Cell: CategoryCell,
      },
      {
        id: "type",
        Header: "Type",
        accessor: (product) => product.productTypeId,
        Cell: ProductTypeCell,
      },
      {
        id: "image",
        Header: "Image",
        accessor: (product) => product.image,
        Cell: ImageCell,
      },
    ];
    return baseColumns.concat({
      id: "menu",
      Header: "",
      accessor: (product) => product,
      Cell: ({ value }: { value: ProductProps }) => (
        <OptionMenuCell value={value} />
      ),
    });
  }, []);

  return (
    <div>
      <div className="font-medium text-h2 mb-6">Manage Products Page</div>
      <DashboardTable data={products ?? []} columns={columns} />
    </div>
  );
};

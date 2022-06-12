import { ProductProps } from "common/components/ProductCard";
import { useLoading } from "hooks/useLoading";
import { useState, useEffect, useMemo, useCallback } from "react";
import API from "api/axios";
import { DashboardTable } from "features/Admin/components/DashboardTable";
import { Column, Row } from "react-table";
import { TextCell } from "features/Admin/components/Cells/TextCell";
import { ImageCell } from "features/Admin/components/Cells/ImageCell";
import { CategoryCell } from "features/Admin/components/Cells/CategoryCell";
import { ProductTypeCell } from "features/Admin/components/Cells/ProductTypeCell";
import { OptionMenuCell } from "features/Admin/components/Cells/OptionMenuCell";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "common/components/Button";
import SvgPlus from "common/components/svg/Plus";
import { ProductCreatePopup } from "features/Products/ProductCreatePopup";

export const ManageProductsPage = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProps[]>();
  const [isShowPopup, setShowPopup] = useState(false);
  const [refetch, setRefetch] = useState({});
  const [showLoading, hideLoading] = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: ProductProps[] = await API.get("/product/list");
      setProducts(data);
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading, refetch]);

  const handleRowDelete = useCallback(
    async (value: ProductProps) => {
      try {
        showLoading();
        await API.delete(`/product/${value._id}`);
        setProducts((previous) =>
          previous?.filter((it) => it._id !== value._id)
        );
        hideLoading();
      } catch (error: any) {
        hideLoading();
        toast.error(error.message);
      }
    },
    [showLoading, hideLoading]
  );

  const handleRowEdit = useCallback(
    (value: ProductProps) => {
      const productId = value._id;
      navigate(`./detail/${productId}`);
    },
    [navigate]
  );

  const columns = useMemo<Column<Partial<ProductProps>>[]>(() => {
    const baseColumns: Column<Partial<ProductProps>>[] = [
      {
        id: "code",
        Header: "Code",
        accessor: (product) => product.productCode?.toUpperCase(),
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
        <OptionMenuCell
          value={value}
          onDelete={handleRowDelete}
          onEdit={handleRowEdit}
        />
      ),
    });
  }, [handleRowDelete, handleRowEdit]);

  const handleRowSelected = (selectedRow: Row<Partial<ProductProps>>) => {
    const productId = selectedRow.original._id;
    navigate(`./detail/${productId}`);
  };

  return (
    <div>
      <div className="flex items-center justify-between font-medium mb-6">
        <div className="text-h2">Manage Products Page</div>
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowPopup(true)}
        >
          <span>Create new product</span>
          <SvgPlus />
        </Button>
      </div>
      <DashboardTable
        data={products ?? []}
        columns={columns}
        onRowSelected={handleRowSelected}
      />
      <ProductCreatePopup
        isOpen={isShowPopup}
        onClose={() => setShowPopup(false)}
        mutate={() => setRefetch({})}
      />
    </div>
  );
};

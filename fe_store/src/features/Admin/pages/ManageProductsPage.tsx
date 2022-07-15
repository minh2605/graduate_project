import {
  ProductPaginationProps,
  ProductProps,
} from "common/components/ProductCard";
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
import queryString from "query-string";
import SvgLeftArrow from "common/components/svg/LeftArrow";
import { PaginationControl } from "common/components/PaginationControl";
import { usePaginationFilter } from "hooks/usePaginationFilter";
import { Switch } from "@headlessui/react";

export interface PaginationInfoProps {
  limit: number;
  currentPage: number;
  totalPage: number;
  totalProduct: number;
}

export const ManageProductsPage = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProps[]>();
  const [isArchived, setIsArchived] = useState(false);
  const [isShowPopup, setShowPopup] = useState(false);
  const [refetch, setRefetch] = useState({});
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
      const data: ProductPaginationProps = await API.get(
        `/product/list?${queryString.stringify({
          ...paginationFilter,
          archived: isArchived,
        })}`
      );
      setProducts(data.productList);
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
  }, [showLoading, hideLoading, refetch, paginationFilter, isArchived]);

  const handleRowDelete = useCallback(
    async (value: ProductProps, archive: boolean = true) => {
      try {
        showLoading();
        archive
          ? await API.post(`/product/delete/${value._id}`)
          : await API.delete(`/product/${value._id}`);
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

  const handleProductRetrieve = useCallback(
    async (value: ProductProps) => {
      const productId = value._id;
      try {
        showLoading();
        await API.put(`/product/retrieve/${productId}`);
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
          onRetrieve={handleProductRetrieve}
          isArchived={isArchived}
        />
      ),
    });
  }, [handleRowDelete, handleRowEdit, handleProductRetrieve, isArchived]);

  const handleRowSelected = (selectedRow: Row<Partial<ProductProps>>) => {
    const productId = selectedRow.original._id;
    navigate(`./detail/${productId}`);
  };

  const handlePageChange = (selectedItem: { selected: number }) => {
    const pageSelected = selectedItem.selected + 1;
    console.log("pageSelected", pageSelected);
    setPaginationFilter({
      ...paginationFilter,
      page: pageSelected,
    });
    console.log("pageSelected", pageSelected);
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
        <div className="flex items-center gap-4">
          <Switch
            checked={isArchived}
            onChange={setIsArchived}
            className={`${isArchived ? "bg-dark-red" : "bg-light-grey"}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 `}
          >
            <span
              aria-hidden="true"
              className={`${isArchived ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <span
            className={`${
              isArchived ? "text-dark-red" : "text-light-grey"
            } transition-colors`}
          >
            Archived
          </span>
        </div>
      </div>
      <DashboardTable
        data={products ?? []}
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
      <ProductCreatePopup
        isOpen={isShowPopup}
        onClose={() => setShowPopup(false)}
        mutate={() => setRefetch({})}
      />
    </div>
  );
};

import { ProductProps } from "common/components/ProductCard";
import { useLoading } from "hooks/useLoading";
import { useState, useEffect, useMemo, useCallback } from "react";
import API from "api/axios";
import { DashboardTable } from "features/Admin/components/DashboardTable";
import { Column, Row } from "react-table";
import { TextCell } from "features/Admin/components/Cells/TextCell";
import { ImageCell } from "features/Admin/components/Cells/ImageCell";
import { CategoryProps } from "features/Admin/components/Cells/CategoryCell";
import { ProductTypeCell } from "features/Admin/components/Cells/ProductTypeCell";
import { OptionMenuCell } from "features/Admin/components/Cells/OptionMenuCell";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "common/components/Button";
import SvgPlus from "common/components/svg/Plus";
import { CategoryCreatePopup } from "features/Category/CategoryCreatePopup";

export interface PaginationInfoProps {
  limit: number;
  currentPage: number;
  totalPage: number;
  totalProduct: number;
}

export const ManageCategoryPage = (): JSX.Element => {
  const [categories, setCategories] = useState<CategoryProps[]>();
  const [isShowPopup, setShowPopup] = useState(false);
  const [refetch, setRefetch] = useState({});
  const [showLoading, hideLoading] = useLoading();
  const navigate = useNavigate();
  //   const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>({
  //     limit: 0,
  //     currentPage: 0,
  //     totalPage: 0,
  //     totalProduct: 0,
  //   });

  //   const [paginationFilter, setPaginationFilter] = usePaginationFilter({
  //     page: 1,
  //     limit: 5,
  //   });

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: CategoryProps[] = await API.get(`/category/list`);
      setCategories(data);
      //   const paginationData: PaginationInfoProps = {
      //     limit: data.limit,
      //     currentPage: data.currentPage,
      //     totalPage: data.totalPage,
      //     totalProduct: data.totalProduct,
      //   };
      //   setPaginationInfo(paginationData);
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading, refetch]);

  const handleRowDelete = useCallback(
    async (value: CategoryProps) => {
      try {
        showLoading();
        await API.post(`/category/delete/${value._id}`);
        setCategories((previous) =>
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
    (value: CategoryProps) => {
      const categoryId = value._id;
      navigate(`./detail/${categoryId}`);
    },
    [navigate]
  );

  const columns = useMemo<Column<Partial<CategoryProps>>[]>(() => {
    const baseColumns: Column<Partial<CategoryProps>>[] = [
      {
        id: "name",
        Header: "Name",
        accessor: (category) => category.name,
        Cell: TextCell,
      },
      {
        id: "type",
        Header: "Type",
        accessor: (category) => category.productTypeId,
        Cell: ProductTypeCell,
      },
      {
        id: "description",
        Header: "Description",
        accessor: (category) => category.description,
        Cell: TextCell,
      },
      {
        id: "image",
        Header: "Image",
        accessor: (category) => category.image,
        Cell: ImageCell,
      },
    ];
    return baseColumns.concat({
      id: "menu",
      Header: "",
      accessor: (category) => category,
      Cell: ({ value }: { value: CategoryProps }) => (
        <OptionMenuCell
          value={value}
          onDelete={handleRowDelete}
          onEdit={handleRowEdit}
        />
      ),
    });
  }, [handleRowDelete, handleRowEdit]);

  const handleRowSelected = (selectedRow: Row<Partial<CategoryProps>>) => {
    const productId = selectedRow.original._id;
    navigate(`./detail/${productId}`);
  };

  //   const handlePageChange = (selectedItem: { selected: number }) => {
  //     const pageSelected = selectedItem.selected + 1;
  //     console.log("pageSelected", pageSelected);
  //     setPaginationFilter({
  //       ...paginationFilter,
  //       page: pageSelected,
  //     });
  //     console.log("pageSelected", pageSelected);
  //   };

  return (
    <div>
      <div className="flex items-center justify-between font-medium mb-6">
        <div className="text-h2">Manage Categories Page</div>
        <Button
          className="flex items-center gap-2"
          onClick={() => setShowPopup(true)}
        >
          <span>Create new category</span>
          <SvgPlus />
        </Button>
      </div>
      <DashboardTable
        data={categories?.filter((it) => !it.isDelete) ?? []}
        columns={columns}
        onRowSelected={handleRowSelected}
        className="mb-10"
      />
      <CategoryCreatePopup
        isOpen={isShowPopup}
        onClose={() => setShowPopup(false)}
        mutate={() => setRefetch({})}
      />
    </div>
  );
};

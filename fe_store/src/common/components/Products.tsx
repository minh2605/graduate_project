import {
  ProductCard,
  ProductPaginationProps,
  ProductProps,
} from "common/components/ProductCard";
import API from "api/axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLoading } from "hooks/useLoading";
import { motion } from "framer-motion";
import { ProductTypesFilter } from "common/components/ProductTypesFilter";
import { ProductTypeProps } from "features/Admin/components/Cells/ProductTypeCell";
import { toast } from "react-toastify";
import { CategoryProps } from "features/Admin/components/Cells/CategoryCell";
import { SelectFieldOptionsProps } from "common/components/Form/SelectField";
import queryString from "query-string";
import { CategoriesFilter } from "./CategoriesFilter";
import { PaginationInfoProps } from "features/Admin/pages/ManageProductsPage";
import { PaginationControl } from "./PaginationControl";
import SvgLeftArrow from "./svg/LeftArrow";
import { HeaderSeachBar } from "features/Admin/components/HeaderAdmin";
import SvgSearch from "./svg/Search";
import debounce from "lodash/debounce";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

export const Products = (): JSX.Element => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [productTypes, setProductTypes] = useState<
    SelectFieldOptionsProps<string>[]
  >([]);
  const [categories, setCategories] = useState<
    SelectFieldOptionsProps<string>[]
  >([]);
  const [showLoading, hideLoading] = useLoading();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedOption, setSelectedOption] =
    useState<SelectFieldOptionsProps<string>>();

  const [paginationInfo, setPaginationInfo] = useState<PaginationInfoProps>({
    limit: 0,
    currentPage: 0,
    totalPage: 0,
    totalProduct: 0,
  });

  const productFilterUrl = useMemo(() => {
    const productFilter = {
      page: paginationInfo.currentPage,
      productTypeId: productTypes[selectedTab]?.value ?? "",
      categoryId: selectedOption?.value ?? "",
      name: nameFilter,
    };
    return queryString.stringify(productFilter);
  }, [
    selectedTab,
    productTypes,
    selectedOption,
    paginationInfo.currentPage,
    nameFilter,
  ]);

  const resetPage = useCallback(() => {
    setPaginationInfo((prev) => {
      return {
        ...prev,
        currentPage: 1,
      };
    });
  }, []);

  // Get products
  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      const data: ProductPaginationProps = await API.get(
        `/product/list?${productFilterUrl}`
      );
      setProducts(data.productList);
      setPaginationInfo({
        limit: data.limit,
        currentPage: data.currentPage,
        totalPage: data.totalPage,
        totalProduct: data.totalProduct,
      });
      hideLoading();
    };
    fetchData();
  }, [showLoading, hideLoading, productTypes, selectedTab, productFilterUrl]);

  // Get product types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productTypeList: ProductTypeProps[] = await API.get(
          `/product_type/list`
        );
        if (productTypeList) {
          const productTypesOptions = productTypeList.map((it) => {
            return {
              value: it._id,
              label: it.name,
            };
          });
          productTypesOptions.unshift({ value: "", label: "All" });
          setProductTypes(productTypesOptions);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  // Get categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryList: CategoryProps[] = await API.get(`/category/list`);
        if (categoryList) {
          const categoryListsOptions = categoryList.map((it) => {
            return {
              value: it._id,
              label: it.name,
              productTypeId: it.productTypeId,
            };
          });
          categoryListsOptions.unshift({
            value: "",
            label: "All",
            productTypeId: productTypes[selectedTab]?.value,
          });
          setCategories(categoryListsOptions);
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [selectedTab, productTypes]);

  const handlePageChange = (selectedItem: { selected: number }) => {
    const pageSelected = selectedItem.selected + 1;
    setPaginationInfo({
      ...paginationInfo,
      currentPage: pageSelected,
    });
  };

  const debouncedSearch = debounce(async (searchText) => {
    setNameFilter(searchText);
  }, 400);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("e", e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <>
      <div className="flex justify-between gap-20 mb-5">
        <HeaderSeachBar>
          <input
            type="text"
            placeholder="Search"
            className="border-0 max-w-full focus:outline-none text-sm flex-1 lg:px-4"
            onChange={handleSearchChange}
          />
          <SvgSearch className="shrink-0" />
        </HeaderSeachBar>
        <ProductTypesFilter
          tabList={productTypes}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          setSelectedOption={setSelectedOption}
          resetPage={resetPage}
        />
        <CategoriesFilter
          options={categories}
          onSelected={setSelectedOption}
          productTypeId={productTypes[selectedTab]?.value}
          resetPage={resetPage}
        />
      </div>
      <motion.div
        layout
        className="grid grid-cols-2 gap-2 mb-5 md:grid-cols-3 md:gap-4"
      >
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </motion.div>
      <PaginationControl
        previousLabel={<SvgLeftArrow />}
        nextLabel={<SvgLeftArrow className="rotate-180" />}
        pageCount={paginationInfo.totalPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

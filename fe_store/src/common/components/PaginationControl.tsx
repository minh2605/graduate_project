import { ReactNode } from "react";
import ReactPaginate from "react-paginate";

interface PaginationControlProps {
  previousLabel: ReactNode;
  nextLabel: ReactNode;
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

export const PaginationControl = ({
  previousLabel,
  nextLabel,
  pageCount,
  onPageChange,
}: PaginationControlProps): JSX.Element => {
  return (
    <ReactPaginate
      breakLabel="..."
      previousLabel={previousLabel}
      nextLabel={nextLabel}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName="flex justify-end gap-2 mb-10 h-5 h-[32px]"
      nextLinkClassName="flex items-center justify-center rounded w-8 max-w-[32px] h-full bg-dark-red text-white"
      previousLinkClassName="flex items-center justify-center w-8 rounded max-w-[32px] h-full bg-dark-red text-white"
      pageLinkClassName="flex items-center justify-center px-3 border rounded max-w-[32px] h-full block"
      activeClassName="text-white bg-light-red"
    />
  );
};

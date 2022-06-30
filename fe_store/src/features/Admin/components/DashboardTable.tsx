import {
  Column,
  Row,
  useFlexLayout,
  useGlobalFilter,
  useTable,
} from "react-table";
import { GlobalFilter } from "./GlobalFilter";
interface DashboardTableProps<T extends object> {
  className?: string;
  data: T[];
  columns: Array<Column<T>>;
  onRowSelected: (selectedRow: Row<T>) => void;
}
export const DashboardTable = <T extends object>({
  data,
  columns,
  className,
  onRowSelected,
}: DashboardTableProps<T>): JSX.Element => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useFlexLayout, useGlobalFilter);

  const { globalFilter } = state;
  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div
        className={`shadow-2xl rounded-xl py-2 w-full max-w-full ${className}`}
      >
        <div {...getTableProps()}>
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  <div
                    {...column.getHeaderProps()}
                    className="flex justify-center items-center p-4 font-medium text-base text-dark-red"
                  >
                    {column.render("Header")}
                  </div>
                ))
              }
            </div>
          ))}

          {data && data.length > 0 ? (
            <div {...getTableBodyProps()}>
              {/* // Loop over the cells in each row */}

              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <div
                    {...row.getRowProps()}
                    className={`mb-2 p-2 hover:bg-light-red-opacity ${
                      i % 2 === 0 ? "bg-border-grey-opacity" : ""
                    }`}
                    onClick={() => onRowSelected(row)}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <div {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center mt-4">No result found</div>
          )}
        </div>
      </div>
    </div>
  );
};

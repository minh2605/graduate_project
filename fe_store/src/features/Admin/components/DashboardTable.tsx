import { Column, useFlexLayout, useTable } from "react-table";
interface DashboardTableProps<T extends object> {
  className?: string;
  data: T[];
  columns: Array<Column<T>>;
}
export const DashboardTable = <T extends object>({
  data,
  columns,
  className,
}: DashboardTableProps<T>): JSX.Element => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFlexLayout);

  return (
    <div className={`shadow-2xl rounded-xl ${className}`}>
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
                  className="mb-4 hover:bg-light-red-opacity"
                >
                  {row.cells.map((cell) => {
                    return (
                      <div {...cell.getCellProps()}>{cell.render("Cell")}</div>
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
  );
};

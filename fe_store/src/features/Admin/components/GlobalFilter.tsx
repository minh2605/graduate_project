import SvgSearch from "common/components/svg/Search";
import tw, { styled } from "twin.macro";

interface GlobalFilterProps {
  filter: any;
  setFilter: any;
}

export const TableFilter = styled.div(
  tw`flex items-center border rounded-3xl p-2 mb-5 w-1/5`
);

export const GlobalFilter = ({
  filter,
  setFilter,
}: GlobalFilterProps): JSX.Element => {
  return (
    <TableFilter className="">
      <input
        type="text"
        placeholder="Search"
        className="border-0 focus:outline-none text-sm flex-1 lg:px-2"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
      <SvgSearch className="shrink-0" />
    </TableFilter>
  );
};

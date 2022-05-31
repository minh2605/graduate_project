type TitleCellProps = {
  value: string;
};

export const TextCell = ({ value }: TitleCellProps): JSX.Element => (
  <div className="flex justify-center items-center h-full text-center text-sm">
    <p className="max-w-[140px] text-ellipsis overflow-hidden">{value}</p>
  </div>
);

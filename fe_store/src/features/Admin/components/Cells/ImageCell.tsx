type ImageCellProps = {
  value: string;
};

export const ImageCell = ({ value }: ImageCellProps): JSX.Element => (
  <div className="flex justify-center items-center h-full">
    <div className="max-w-[140px] text-ellipsis overflow-hidden rounded overflow-hidden">
      <img src={value} alt="table-img" className="w-full h-full object-cover" />
    </div>
  </div>
);

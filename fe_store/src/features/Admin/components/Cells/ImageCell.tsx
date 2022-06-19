type ImageCellProps = {
  value: string;
};

export const ImageCell = ({ value }: ImageCellProps): JSX.Element => (
  <div className="flex justify-center items-center h-full p-2">
    <div className="max-w-[140px] max-h-[140px] p-2 w-24 h-24 text-ellipsis overflow-hidden rounded overflow-hidden border border-light-red">
      <img src={value} alt="table-img" className="w-full h-full object-cover" />
    </div>
  </div>
);

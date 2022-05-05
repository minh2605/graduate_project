import SvgInfo from "common/components/svg/Info";
import { Button } from "common/components/Button";

interface StoreOptionsProps {
  onOpenModal: (value: boolean) => void;
}

export const StoreOptions = ({
  onOpenModal,
}: StoreOptionsProps): JSX.Element => {
  return (
    <div
      className="flex items-center justify-between"
      onClick={() => onOpenModal(true)}
    >
      <h1 className="text-h1 font-bold font-bangers tracking-widest">Foogle</h1>
      <Button className="flex items-center gap-2">
        <SvgInfo />
        <span>More Info</span>
      </Button>
    </div>
  );
};

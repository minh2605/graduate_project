import SvgInfo from "common/components/svg/Info";
import { Button } from "common/components/Button";
import { OrderTypeBar } from "common/components/OrderTypeBar";
import { StoreInfoPopup } from "features/Store/components/StoreInfoPopup";
import { useState } from "react";

// interface StoreOptionsProps {
//   // onOpenModal: (value: boolean) => void;
// }

export const StoreOptions = (): JSX.Element => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="mb-4">
      <StoreInfoPopup isOpen={isOpen} onClose={() => setOpen(false)} />
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-h1 font-bold font-bangers tracking-widest">
          Foogle
        </h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <SvgInfo />
          <span>More Info</span>
        </Button>
      </div>
      <OrderTypeBar />
    </div>
  );
};

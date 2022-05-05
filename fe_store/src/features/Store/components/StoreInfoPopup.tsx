import { MapWrapper } from "common/components/MapContainer";
import { Modal } from "common/components/Modal";
import SvgClock from "common/components/svg/Clock";
import SvgLocation from "common/components/svg/Location";
import SvgPhone from "common/components/svg/Phone";

interface StoreInfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StoreInfoPopup = ({
  isOpen,
  onClose,
}: StoreInfoPopupProps): JSX.Element => {
  return (
    <Modal open={isOpen} onClose={onClose} size="md">
      <div className="flex flex-col">
        <h2 className="text-h2 mb-10 text-center font-bold leading-[22px]">
          Foogle
        </h2>
        <div className="h-80">
          <MapWrapper />
        </div>
        <div className="flex items-center gap-2 px-2 py-4 border-b">
          <SvgLocation />
          <div>
            <span>10096 East 13th Street North</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2 py-4 border-b">
          <SvgClock />
          <div>
            <span>Closed • Opens Tue at 11 AM</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-2 py-4 border-b">
          <SvgPhone />
          <div>
            <span>+13166160969</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

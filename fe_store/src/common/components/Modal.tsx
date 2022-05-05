import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import tw, { styled } from "twin.macro";

type ModalProps = {
  open?: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  size?: "elg" | "lg" | "md" | "sm" | "exl" | "emd";
};

const ModalContainer = styled.div(({ size }: Pick<ModalProps, "size">) => [
  tw`p-8 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full`,
  size === "sm" && tw`sm:max-w-lg`,
  size === "md" && tw`sm:max-w-xl`,
  size === "lg" && tw`sm:max-w-5xl`,
  size === "elg" && tw`sm:max-w-6xl p-0`,
  size === "exl" && tw`sm:max-w-[534px]`,
  size === "emd" && tw`sm:max-w-[432px]`,
]);

export const Modal = ({ open, onClose, size, children }: ModalProps) => (
  <Transition.Root show={!!open} as={Fragment}>
    <Dialog
      as="div"
      className="fixed z-modal inset-0 overflow-y-auto"
      onClose={onClose}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-20 transition-opacity" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <ModalContainer className="transform" size={size}>
            {children}
          </ModalContainer>
        </Transition.Child>
      </div>
    </Dialog>
  </Transition.Root>
);

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Heading,
} from "@chakra-ui/react";
import { DARK } from "../../utils/color";

type Props = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  button?: JSX.Element;
  size?: string;
};
function ModalComponent(props: Props) {
  return (
    <Modal
      size={props?.size ?? "md"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />

        <ModalBody maxH="70vh" overflow="auto" py={5}>
          {props.children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;

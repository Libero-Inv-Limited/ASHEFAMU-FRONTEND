import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from "@chakra-ui/react";

type Props = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  button?: JSX.Element;
  size?: string;
  closeButton?: boolean;
};
function ModalComponent(props: Props) {
  return (
    <Modal
      size={props?.size ?? "md"}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      
      <ModalOverlay/>
      <ModalContent >
      {props.title && <ModalHeader>{props.title}</ModalHeader>}
        {props.closeButton && <ModalCloseButton />}

        <ModalBody maxH="80vh" overflow="auto" py={5}>
          {props.children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalComponent;

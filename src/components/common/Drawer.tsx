import React from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Center
} from "@chakra-ui/react";

type Props = {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: string;
};

const DrawerComponent = (props: Props) => {
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        placement="right"
        onClose={props.onClose}
        size={props.size ?? "sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Center>{props.title}</Center>
          </DrawerHeader>
          <DrawerBody>{props.children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;

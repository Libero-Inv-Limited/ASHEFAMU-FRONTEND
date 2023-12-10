import {
  Button,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DARK, RED, TEXT_DARK_GRAY } from "../../utils/color";
import { RxCross1 } from "react-icons/rx";
import { IoCardOutline } from "react-icons/io5";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { paymentMethods } from "../../utils/data";

type MethodType = "remita" | "paystack" | "paypal" | "interswitch";

interface InvoiceModalProps {
  invoiceId: string;
  status: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  handleAction: (name: MethodType) => void;
  handleViewInvoice: () => void;
}
const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  handleAction,
  handleViewInvoice,
  invoiceId,
  status,
}) => {
  const [isPaying, setIsPaying] = useState<boolean>(false);

  const toast = useToast({
    position: "bottom",
    isClosable: true,
    variant: "subtle",
  });

  const handleTriggerPay = () => {
    if (status.toLowerCase() === "paid") {
      toast({
        title: "Invoice already paid!",
        status: "info",
      });
      onClose();
      return;
    }
    setIsPaying(true);
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      {isPaying ? (
        <ModalContent pos={"relative"}>
          <ModalBody p={4}>
            <HStack spacing={0}>
              <IconButton
                aria-label="close"
                onClick={() => setIsPaying(false)}
                icon={
                  <Icon
                    as={HiOutlineArrowNarrowLeft}
                    fontSize={"2xl"}
                    color={DARK}
                  />
                }
                variant={"ghost"}
                size={"sm"}
              />
              <Heading flex={1} textAlign={"center"} size={"sm"} color={DARK}>
                Choose payment method
              </Heading>
            </HStack>

            <SimpleGrid columns={2} mt={6} gap={4}>
              {paymentMethods.map((method) => (
                <Button
                  isDisabled={method.isDisabled}
                  isLoading={isLoading}
                  onClick={() => handleAction(method.name as MethodType)}
                  key={`pay-method-${method.name}`}
                  display={"flex"}
                  h={40}
                  flex={1}
                  fontSize={"xl"}
                >
                  <Center>
                    <Image src={method.image} h={8} />
                  </Center>
                </Button>
              ))}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      ) : (
        <ModalContent pos={"relative"}>
          <IconButton
            aria-label="close"
            onClick={onClose}
            icon={<Icon as={RxCross1} fontSize={"lg"} color={RED} />}
            variant={"ghost"}
            size={"sm"}
            pos={"absolute"}
            top={2}
            right={2}
            colorScheme="red"
          />

          <ModalBody p={4}>
            <Stack spacing={0}>
              <Heading size={"sm"} color={DARK}>
                INVOICE
              </Heading>
              <Text fontSize={"xs"} color={TEXT_DARK_GRAY}>
                {invoiceId}
              </Text>
            </Stack>

            <HStack mt={6} spacing={4}>
              <Button
                display={"flex"}
                onClick={handleViewInvoice}
                h={40}
                flex={1}
                fontSize={"xl"}
              >
                View invoice <br /> details{" "}
              </Button>
              <Button
                onClick={handleTriggerPay}
                display={"flex"}
                h={40}
                flex={1}
                _hover={{
                  bg:
                    status === "paid"
                      ? "green"
                      : "linear-gradient(180deg, #14D1C6 0%, #0E53A4 100%)",
                }}
                fontSize={"xl"}
                bg={
                  status === "paid"
                    ? "green"
                    : "linear-gradient(180deg, #14D1C6 0%, #0E53A4 100%)"
                }
              >
                <VStack>
                  <Icon as={IoCardOutline} fontSize={"4xl"} color={"white"} />
                  <Text color={"white"} fontSize={"xl"}>
                    {status === "paid" ? "Paid" : "Pay Invoice"}
                  </Text>
                </VStack>
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      )}
    </Modal>
  );
};

export default InvoiceModal;

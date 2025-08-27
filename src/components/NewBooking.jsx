import { Box, Button, Text } from "@chakra-ui/react";
import { FaCalendarPlus } from "react-icons/fa";
import { Modal } from "@chakra-ui/react";
import { AppointmentBookingForm } from "./AppointmentBookingForm";
import { useDisclosure } from "@chakra-ui/react";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { ModalCloseButton } from "@chakra-ui/react";
import { ModalOverlay } from "@chakra-ui/react";
import { FaCalendarWeek } from "react-icons/fa6";

export const NewBooking = ({ services, onSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        w="100%"
        bg="whiteAlpha.900"
        boxShadow="0 -2px 12px rgba(0,0,0,0.08)"
        p={{ base: 2, md: 4 }}
      >
        <Button
          w={{ base: "100%", md: "fit-content" }}
          colorScheme="blue"
          leftIcon={<FaCalendarPlus />}
          fontWeight="bold"
          fontSize={{ base: "md", md: "lg" }}
          onClick={() => {
            onOpen();
            console.log("New booking booked");
          }}
        >
          <Text>Book New Appointment</Text>
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="gray.100" p={{ base: 2, md: 0 }}>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AppointmentBookingForm
              services={services}
              onSuccess={() => {
                onSuccess();
                onClose();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

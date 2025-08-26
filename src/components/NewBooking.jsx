import { Button } from "@chakra-ui/react";
import { Modal } from "@chakra-ui/react";
import { AppointmentBookingForm } from "./AppointmentBookingForm";
import { useDisclosure } from "@chakra-ui/react";
import { ModalBody, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";
import { ModalCloseButton } from "@chakra-ui/react";
import { ModalOverlay } from "@chakra-ui/react";

export const NewBooking = ({services, onSuccess}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
        <Button w="fit-content" colorScheme="blue" onClick={() => {onOpen(); console.log("New booking booked")}} m={4}>
            Book New Appointment
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="gray.100">
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <AppointmentBookingForm services={services} onSuccess={() => {onSuccess(); onClose();}} />
                </ModalBody>
                {/* <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={() => {console.log("Booking confirmed")}}>
                        Confirm
                    </Button>
                    <Button onClick={() => {onClose(); console.log("Booking cancelled")}}>Cancel</Button>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
    </>

  );
}
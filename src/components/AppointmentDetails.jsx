import { Box, VStack, Text } from "@chakra-ui/react";
import { AppointmentCard } from "./AppointmentCard";

export const AppointmentDetails = ({
  isAdmin,
  appointments,
  getServiceFromId,
  getStatusFromId,
  updateAppointmentStatus,
}) => {
  return (
    <VStack w="100%" spacing={4} align="center" py={2} overflow="scroll">
      {appointments.length === 0 && (
        <Text color="gray.500" fontSize="md" textAlign="center">
          No appointments found for this date. Book your slot now!
        </Text>
      )}
      {appointments.map((appointment) => (
        <AppointmentCard
          key={appointment.appointmentId}
          appointment={appointment}
          isAdmin={isAdmin}
          getServiceFromId={getServiceFromId}
          getStatusFromId={getStatusFromId}
          updateAppointmentStatus={updateAppointmentStatus}
        />
      ))}
    </VStack>
  );
};

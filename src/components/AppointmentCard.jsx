import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Button,
  HStack,
  VStack,
} from "@chakra-ui/react";
import {
  FaUser,
  FaCalendarAlt,
  FaEnvelope,
  FaPhone,
  FaClipboardList,
} from "react-icons/fa";
import { StatusAction } from "./StatusAction";

export const AppointmentCard = ({
  appointment,
  isAdmin,
  getServiceFromId,
  getStatusFromId,
  updateAppointmentStatus,
}) => {
  return (
    <Box
      bg="white"
      boxShadow="md"
      borderRadius="xl"
      p={4}
      mb={4}
      w="100%"
      maxW="500px"
      mx="auto"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: "lg" }}
    >
      <Stack spacing={2}>
        <HStack justifyContent="space-between">
          <Heading size="sm" color="blue.600">
            Appointment #{appointment.appointmentId}
          </Heading>
          <Badge colorScheme="blue" fontSize="0.9em">
            {getStatusFromId(appointment.statusId)}
          </Badge>
        </HStack>
        <Text fontWeight="bold" color="gray.700">
          <FaUser style={{ display: "inline", marginRight: 6 }} />
          {appointment.firstName} {appointment.lastName}
        </Text>
        {isAdmin && (
          <Text color="gray.600">
            <FaEnvelope style={{ display: "inline", marginRight: 6 }} />
            {appointment.emailId || "No email provided"}
          </Text>
        )}
        {isAdmin && (
          <Text color="gray.600">
            <FaPhone style={{ display: "inline", marginRight: 6 }} />
            {appointment.contactNumber || "No contact number"}
          </Text>
        )}
        <Text color="gray.600">
          <FaClipboardList style={{ display: "inline", marginRight: 6 }} />
          {getServiceFromId(appointment.serviceId)}
        </Text>
        <Text color="gray.600">
          <FaCalendarAlt style={{ display: "inline", marginRight: 6 }} />
          {new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(new Date(appointment.appointmentDate))}
        </Text>
        <Box pt={2}>
          <StatusAction
            isAdmin={isAdmin}
            appointmentId={appointment.appointmentId}
            statusId={appointment.statusId}
            updateAppointmentStatus={updateAppointmentStatus}
          />
        </Box>
      </Stack>
    </Box>
  );
};

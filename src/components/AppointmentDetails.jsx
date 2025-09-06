import { Box, VStack, Text, Heading, HStack } from "@chakra-ui/react";
import { AppointmentCard } from "./AppointmentCard";
import { APPOINTMENT_STATUS } from "../constants";

export const AppointmentDetails = ({
  isAdmin,
  appointments,
  getServiceFromId,
  getStatusFromId,
  updateAppointmentStatus,
}) => {
  // Helper: sort by appointment time ascending
  const sortByTime = (arr) =>
    arr
      .slice()
      .sort(
        (a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate)
      );

  // Status IDs (customize as needed)
  const STATUS = {
    IN_PROGRESS: 4,
    PENDING: 1,
    SCHEDULED: 3,
  };

  // Filter appointments by status
  const inProgress = sortByTime(
    appointments.filter((a) => a.statusId == APPOINTMENT_STATUS.IN_PROGRESS)
  );
  const needsAction = sortByTime(
    appointments.filter((a) => a.statusId == APPOINTMENT_STATUS.PENDING)
  );
  const scheduled = sortByTime(
    appointments.filter((a) => a.statusId == APPOINTMENT_STATUS.CONFIRMED)
  );
  const cancelled = sortByTime(
    appointments.filter((a) => a.statusId == APPOINTMENT_STATUS.CANCELLED)
  );
  const completed = sortByTime(
    appointments.filter((a) => a.statusId == APPOINTMENT_STATUS.COMPLETED)
  );

  // For regular user: in progress first, then all others by date
  const userSorted = sortByTime(appointments);

  return (
    <VStack w="100%" spacing={4} align="center" py={2} overflow="auto">
      {appointments.length === 0 && (
        <Text color="gray.500" fontSize="md" textAlign="center">
          No appointments found for this date. Book your slot now!
        </Text>
      )}

      {isAdmin ? (
        <>
          {/* In Progress Section */}
          {inProgress.length > 0 && (
            <Box
              w="100%"
              bg="blue.50"
              borderRadius="xl"
              boxShadow="md"
              p={{ base: 3, md: 5 }}
              mb={4}
            >
              <HStack mb={2} spacing={2} align="center">
                <Box as="span" color="blue.500" fontSize="xl">
                  🔄
                </Box>
                <Heading size="md" color="blue.700">
                  In Progress
                </Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {inProgress.map((appointment) => (
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
            </Box>
          )}

          {/* Needs Action Section */}
          {needsAction.length > 0 && (
            <Box
              w="100%"
              bg="orange.50"
              borderRadius="xl"
              boxShadow="md"
              p={{ base: 3, md: 5 }}
              mb={4}
            >
              <HStack mb={2} spacing={2} align="center">
                <Box as="span" color="orange.400" fontSize="xl">
                  ⚠️
                </Box>
                <Heading size="md" color="orange.700">
                  Needs Action
                </Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {needsAction.map((appointment) => (
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
            </Box>
          )}

          {/* Scheduled Section */}
          {scheduled.length > 0 && (
            <Box
              w="100%"
              bg="green.50"
              borderRadius="xl"
              boxShadow="md"
              p={{ base: 3, md: 5 }}
              mb={4}
            >
              <HStack mb={2} spacing={2} align="center">
                <Box as="span" color="green.500" fontSize="xl">
                  📅
                </Box>
                <Heading size="md" color="green.700">
                  Scheduled
                </Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {scheduled.map((appointment) => (
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
            </Box>
          )}

          {/* Completed Section */}
          {completed.length > 0 && (
            <Box
              w="100%"
              bg="purple.50"
              borderRadius="xl"
              boxShadow="md"
              p={{ base: 3, md: 5 }}
              mb={4}
            >
              <HStack mb={2} spacing={2} align="center">
                <Box as="span" color="purple.500" fontSize="xl">
                  ✅
                </Box>
                <Heading size="md" color="purple.700">
                  Completed
                </Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {completed.map((appointment) => (
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
            </Box>
          )}

          {/* Cancelled Section */}
          {cancelled.length > 0 && (
            <Box
              w="100%"
              bg="red.50"
              borderRadius="xl"
              boxShadow="md"
              p={{ base: 3, md: 5 }}
              mb={4}
            >
              <HStack mb={2} spacing={2} align="center">
                <Box as="span" color="red.500" fontSize="xl">
                  ❌
                </Box>
                <Heading size="md" color="red.700">
                  Cancelled
                </Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {cancelled.map((appointment) => (
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
            </Box>
          )}
        </>
      ) : (
        <>
          {/* Regular User: In Progress first, then all others */}
          {inProgress.length > 0 && (
            <Box
              w="100%"
              bg="blue.50"
              borderRadius="xl"
              boxShadow="md"
              p={{ base: 3, md: 5 }}
              mb={4}
            >
              <HStack mb={2} spacing={2} align="center">
                <Box as="span" color="blue.500" fontSize="xl">
                  🔄
                </Box>
                <Heading size="md" color="blue.700">
                  In Progress
                </Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {inProgress.map((appointment) => (
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
            </Box>
          )}
          {/* All appointments except in progress, sorted by date ascending */}
          {userSorted.filter(
            (a) => a.statusId !== APPOINTMENT_STATUS.IN_PROGRESS
          ).length > 0 && (
            <Box
              w="100%"
              bg="gray.50"
              borderRadius="xl"
              boxShadow="md"
              p={{ base: 3, md: 5 }}
              mb={4}
              mt={inProgress.length > 0 ? 4 : 0}
            >
              <HStack mb={2} spacing={2} align="center">
                <Box as="span" color="gray.600" fontSize="xl">
                  📋
                </Box>
                <Heading size="md" color="gray.700">
                  All Appointments
                </Heading>
              </HStack>
              <VStack spacing={3} align="stretch">
                {userSorted
                  .filter(
                    (appointment) =>
                      appointment.statusId !== APPOINTMENT_STATUS.IN_PROGRESS
                  )
                  .map((appointment) => (
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
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

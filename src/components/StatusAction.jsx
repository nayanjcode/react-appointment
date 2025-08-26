import { Button } from "@chakra-ui/react";
import { APPOINTMENT_STATUS } from "../constants";

export const StatusAction = ({
  appointmentId,
  statusId,
  isAdmin,
  updateAppointmentStatus,
}) => {
  return (
    <>
      {statusId === APPOINTMENT_STATUS.PENDING && (
        <>
          {isAdmin ? (
            <Button
              size="sm"
              mr={2}
              onClick={() =>
                updateAppointmentStatus(
                  appointmentId,
                  APPOINTMENT_STATUS.CONFIRMED
                )
              }
              colorScheme="blue"
            >
              Confirm
            </Button>
          ) : null}
          <Button
            size="sm"
            onClick={() =>
              updateAppointmentStatus(
                appointmentId,
                APPOINTMENT_STATUS.CANCELLED
              )
            }
            colorScheme="red"
          >
            Cancel
          </Button>
        </>
      )}
      {statusId === APPOINTMENT_STATUS.CONFIRMED && (
        <>
          <Button
            size="sm"
            mr={2}
            onClick={() =>
              updateAppointmentStatus(
                appointmentId,
                APPOINTMENT_STATUS.CANCELLED
              )
            }
            colorScheme="red"
          >
            Cancel
          </Button>
          {isAdmin ? (
            <Button 
              size="sm"
              onClick={() =>
                updateAppointmentStatus(
                  appointmentId,
                  APPOINTMENT_STATUS.IN_PROGRESS
                )
              }
              colorScheme="blue"
            >
              Start
            </Button>
          ) : null}
        </>
      )}
      {statusId === APPOINTMENT_STATUS.IN_PROGRESS && isAdmin && (
          <Button
            size="sm"
            onClick={() =>
              updateAppointmentStatus(
                appointmentId,
                APPOINTMENT_STATUS.COMPLETED
              )
            }
            colorScheme="blue"
          >
            Complete
          </Button>
      )}
    </>
  );
};

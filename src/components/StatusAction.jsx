import { Button, Text } from "@chakra-ui/react";
import { APPOINTMENT_STATUS } from "../constants";
import { useEffect, useState } from "react";
import { AppointmentSpinner } from "./AppointmentSpinner";

export const StatusAction = ({
  appointmentId,
  statusId,
  isAdmin,
  updateAppointmentStatus,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  useEffect(()=> {
    setIsUpdatingStatus(isConfirming || isCancelling || isStarting || isCompleting)
  })
  return (
    <>
      {statusId === APPOINTMENT_STATUS.PENDING && (
        <>
          {isAdmin ? (
            <Button
              size="sm"
              mr={2}
              disabled={isUpdatingStatus}
              onClick={() =>
              {
                setIsConfirming(true);
                updateAppointmentStatus(
                  appointmentId,
                  APPOINTMENT_STATUS.CONFIRMED,
                  () => setIsConfirming(false)
                )
              }
              }
              colorScheme="blue"
            >
              <Text>Confirm</Text>
              {
                isConfirming ? 
                <AppointmentSpinner isLoading={true} size="sm" ml={2} thickness="3px"/>
                :null
                }
              
            </Button>
          ) : null}
          <Button
            size="sm"
            disabled={isUpdatingStatus}
            onClick={() =>
            {
              setIsCancelling(true)
              updateAppointmentStatus(
                appointmentId,
                APPOINTMENT_STATUS.CANCELLED,
                () => setIsCancelling(false)
              );
            }
            }
            colorScheme="red"
          >

              <Text>Cancel</Text>
              {
                isCancelling ? 
                <AppointmentSpinner isLoading={true} size="sm" ml={2} thickness="3px"/>
                :null
                }
          </Button>
        </>
      )}
      {statusId === APPOINTMENT_STATUS.CONFIRMED && (
        <>
          <Button
            size="sm"
            mr={2}
            disabled={isUpdatingStatus}
            onClick={() =>
            {
              setIsCancelling(true);
              updateAppointmentStatus(
                appointmentId,
                APPOINTMENT_STATUS.CANCELLED,
                () => setIsCancelling(false)
              )
            }
            }
            colorScheme="red"
          >

              <Text>Cancel</Text>
              {
                isCancelling ? 
                <AppointmentSpinner isLoading={true} size="sm" ml={2} thickness="3px"/>
                :null
                }
          </Button>
          {isAdmin ? (
            <Button 
              size="sm"
              disabled={isUpdatingStatus}
              onClick={() =>
              {
                setIsStarting(true);
                updateAppointmentStatus(
                  appointmentId,
                  APPOINTMENT_STATUS.IN_PROGRESS,
                  () => setIsStarting(false)
                )
              }
              }
              colorScheme="blue"
            >
              <Text>Start</Text>
              {
                isStarting ? 
                <AppointmentSpinner isLoading={true} size="sm" ml={2} thickness="3px"/>
                :null
                }
            </Button>
          ) : null}
        </>
      )}
      {statusId === APPOINTMENT_STATUS.IN_PROGRESS && isAdmin && (
          <Button
            size="sm"
            disabled={isUpdatingStatus}
            onClick={() =>
            {
              setIsCompleting(true);
              updateAppointmentStatus(
                appointmentId,
                APPOINTMENT_STATUS.COMPLETED,
                () => setIsCompleting(false),
              )
            }
            }
            colorScheme="blue"
          >

              <Text>Complete</Text>
              {
                isCompleting ? 
                <AppointmentSpinner isLoading={true} size="sm" ml={2} thickness="3px"/>
                :null
                }
          </Button>
      )}
    </>
  );
};

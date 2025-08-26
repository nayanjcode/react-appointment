import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Heading,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { APPOINTMENT_STATUS } from "../constants";
import { useGetCompanyDetails } from "../hooks/useGetCompanyDetails";
import { useGetAppointmentDetails } from "../hooks/useGetAppointmentDetails";
import { AppointmentFilter } from "../components/AppointmentFilter";
import { AppointmentDetails } from "../components/AppointmentDetails";
import { NewBooking } from "../components/NewBooking";

export default function CustomerBooking() {
  const { companyId } = useParams();
  const [filter, setFilter] = useState({
    date: new Date().toISOString().split("T")[0],
    status: [
      APPOINTMENT_STATUS.IN_PROGRESS,
      APPOINTMENT_STATUS.PENDING,
      APPOINTMENT_STATUS.CONFIRMED,
    ],
  });
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    console.log("companyId:", companyId);
  }, [companyId]);

  const {
    companyDetails,
    appointmentStatusInfo,
    appointmentServicesInfo,
    getStatusFromId,
    getServiceFromId,
  } = useGetCompanyDetails(companyId ? companyId : 0);
  const { appointmentDetails, fetchAppointmentDetails, updateAppointmentStatus } =
    useGetAppointmentDetails(companyId ? companyId : 0, filter);

  useEffect(() => {
    setAppointments(appointmentDetails ? appointmentDetails : []);
  }, [appointmentDetails]);

  return (
    <Box maxW="8xl" mx="auto" mt={10} p={6}>
      <Heading size="lg" mb={4}>
        {`Welcome to ${
          companyDetails
            ? companyDetails.filter((c) => c.companyId == companyId)[0]
                ?.companyName
            : "Nayan Test Company"
        }`}
      </Heading>
      <VStack align="stretch" spacing={4}>
        <AppointmentFilter
          companyId={companyId}
          filter={filter}
          setFilter={setFilter}
          applyFilter={fetchAppointmentDetails}
          appointmentStatusInfo={appointmentStatusInfo}
        />

        <AppointmentDetails
          appointments={appointments}
          getServiceFromId={getServiceFromId}
          getStatusFromId={getStatusFromId}
          updateAppointmentStatus={updateAppointmentStatus}
        />
        {!appointments.length && (
          <Text color="gray.500">No appointments for this date.</Text>
        )}
        <NewBooking
          services={appointmentServicesInfo}
          onSuccess={() => fetchAppointmentDetails()}
        />
      </VStack>
    </Box>
  );
}

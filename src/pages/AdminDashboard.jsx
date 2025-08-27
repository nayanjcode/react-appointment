import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  useToast,
  HStack,
  Text,
} from "@chakra-ui/react";
import { AppointmentDetails } from "../components/AppointmentDetails";
import { NewBooking } from "../components/NewBooking";
import { useParams } from "react-router-dom";
import { useGetCompanyDetails } from "../hooks/useGetCompanyDetails";
import { useGetAppointmentDetails } from "../hooks/useGetAppointmentDetails";
import { AppointmentFilter } from "../components/AppointmentFilter";
import { APPOINTMENT_STATUS } from "../constants";

export default function AdminDashboard() {
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
  const {
    appointmentDetails,
    fetchAppointmentDetails,
    updateAppointmentStatus,
  } = useGetAppointmentDetails(companyId ? companyId : 0, filter);

  useEffect(() => {
    setAppointments(appointmentDetails ? appointmentDetails : []);
  }, [appointmentDetails]);

  return (
    <Box
      maxW={{ base: "100%", md: "8xl" }}
      mx="auto"
      mt={{ base: 2, md: 10 }}
      p={{ base: 2, md: 6 }}
    >
      <Heading
        size={{ base: "md", md: "lg" }}
        mb={4}
        textAlign={{ base: "center", md: "left" }}
      >
        {`Admin Dashboard - ${
          companyDetails
            ? companyDetails.filter((c) => c.companyId == companyId)[0]
                ?.companyName
            : "Nayan Test Company"
        }`}
      </Heading>
      
      <VStack align="stretch" spacing={{ base: 2, md: 4 }}>
        <Box pos="sticky" top="0" bg="white">

          <AppointmentFilter
            isAdmin={true}
            companyId={companyId}
            filter={filter}
            setFilter={setFilter}
            applyFilter={fetchAppointmentDetails}
            appointmentStatusInfo={appointmentStatusInfo}
          />
          <NewBooking
            services={appointmentServicesInfo}
            onSuccess={() => fetchAppointmentDetails()}
          />

        </Box>

        <AppointmentDetails
          isAdmin={true}
          appointments={appointments}
          getServiceFromId={getServiceFromId}
          getStatusFromId={getStatusFromId}
          updateAppointmentStatus={updateAppointmentStatus}
        />        
      </VStack>
    </Box>
  );
}

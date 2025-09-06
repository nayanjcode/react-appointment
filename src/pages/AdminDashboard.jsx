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
  IconButton,
  useDisclosure,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { AppointmentDetails } from "../components/AppointmentDetails";
import { NewBooking } from "../components/NewBooking";
import { useParams } from "react-router-dom";
import { useGetCompanyDetails } from "../hooks/useGetCompanyDetails";
import { useGetAppointmentDetails } from "../hooks/useGetAppointmentDetails";
import { AppointmentFilter } from "../components/AppointmentFilter";
import { FaFilter, FaSync } from "react-icons/fa";
import { APPOINTMENT_STATUS } from "../constants";
import { AppointmentSpinner } from "../components/AppointmentSpinner";

export default function AdminDashboard() {
  const filterDisclosure = useDisclosure();
  const { companyId } = useParams();
  const [filter, setFilter] = useState({
    date: new Date().toISOString().split("T")[0],
    tzOffset: new Date().getTimezoneOffset() * 60,
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
    isLoading
  } = useGetCompanyDetails(companyId ? companyId : 0);
  const {
    appointmentDetails,
    fetchAppointmentDetails,
    updateAppointmentStatus,
    isLoadingAppointments
  } = useGetAppointmentDetails(companyId ? companyId : 0, filter);

  useEffect(() => {
    setAppointments(appointmentDetails ? appointmentDetails : []);
  }, [appointmentDetails]);

  return (
    isLoading ?
    <Center h="100vh">
      <AppointmentSpinner isLoading={true}/>
    </Center> :
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
            : ""
        }`}
      </Heading>

      <VStack align="stretch" spacing={{ base: 2, md: 4 }}>
        <Box pos="sticky" top="0" bg="white" >
          <HStack>
            <IconButton
              icon={<FaFilter />}
              aria-label={
                filterDisclosure.isOpen ? "Hide filters" : "Show filters"
              }
              colorScheme={filterDisclosure.isOpen ? "gray" : "blue"}
              variant={filterDisclosure.isOpen ? "outline" : "solid"}
              size="md"
              alignSelf="flex-end"
              onClick={filterDisclosure.onToggle}
            />
            <NewBooking
              services={appointmentServicesInfo}
              onSuccess={() => fetchAppointmentDetails()}
            />
            <IconButton
              icon={<FaSync />}
              aria-label="Refresh"
              colorScheme="blue"
              onClick={() => fetchAppointmentDetails()}
              size="md"
            />
          </HStack>
          <AppointmentFilter
            isAdmin={true}
            companyId={companyId}
            filter={filter}
            setFilter={setFilter}
            applyFilter={fetchAppointmentDetails}
            appointmentStatusInfo={appointmentStatusInfo}
            showFilters={filterDisclosure.isOpen}
          />
        </Box>

        <Box
          flex={1}
          overflowY="auto"
          maxH="calc(100vh - 220px)"
          pt={{ base: 4, md: 6 }}
          pb={{ base: 16, md: 20 }}
        >
          <AppointmentDetails
            isAdmin={true}
            appointments={appointments}
            getServiceFromId={getServiceFromId}
            getStatusFromId={getStatusFromId}
            updateAppointmentStatus={updateAppointmentStatus}
            isLoading={isLoadingAppointments}
          />
        </Box>
      </VStack>
    </Box>
  );
}

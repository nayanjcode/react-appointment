import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { APPOINTMENT_STATUS } from "../constants";
import { StatusAction } from "./StatusAction";

export const AppointmentDetails = ({
  isAdmin,
  appointments,
  getServiceFromId,
  getStatusFromId,
  updateAppointmentStatus,
}) => {
  return (
    <Box overflowX="auto" w="100%">
      <Table variant="striped" size={{ base: "sm", md: "md" }} minWidth="600px">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer</Th>
            {isAdmin ? (
              <Th display={{ base: "none", md: "table-cell" }}>Email Id</Th>
            ) : null}
            {isAdmin ? (
              <Th display={{ base: "none", md: "table-cell" }}>Contact</Th>
            ) : null}
            <Th>Service</Th>
            <Th>Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {appointments.map((r) => (
            <Tr key={r.appointmentId}>
              <Td>{r.appointmentId}</Td>
              <Td>{`${r.firstName} ${r.lastName}`}</Td>
              {isAdmin ? (
                <Td display={{ base: "none", md: "table-cell" }}>
                  {r.emailId ?? ""}
                </Td>
              ) : null}
              {isAdmin ? (
                <Td display={{ base: "none", md: "table-cell" }}>
                  {r.contactNumber ?? ""}
                </Td>
              ) : null}
              <Td>{getServiceFromId(r.serviceId)}</Td>
              <Td>
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }).format(new Date(r.appointmentDate))}
              </Td>
              <Td>{getStatusFromId(r.statusId)}</Td>
              <Td>
                <StatusAction
                  isAdmin={isAdmin}
                  appointmentId={r.appointmentId}
                  statusId={r.statusId}
                  updateAppointmentStatus={updateAppointmentStatus}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

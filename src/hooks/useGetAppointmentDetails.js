import { useCallback, useEffect, useState } from "react";
import { apiGet, apiSend } from "../utils/api";
import { useToast } from "@chakra-ui/react";
import { APPOINTMENT_STATUS } from "../constants";

export const useGetAppointmentDetails = (companyId, filter) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const toast = useToast();

  const fetchAppointmentDetails = useCallback(() => {
    const request = {};
    request.companyId = companyId ? companyId : 0;
    request.filter = filter;
    apiSend(`/appointment/getAppointments`, 'POST', request)
      .then((appointmentData) => {
        const formattedAppointments = appointmentData.map(ap => {
          return { ...ap.appointment, ...ap.customerDetails }
        });
        console.log("formattedAppointments :", formattedAppointments);
        setAppointmentDetails(formattedAppointments)
      })
      .catch(e => toast({ title: 'Load failed', description: e.message, status: 'error' }))
  }, [filter, companyId]);

  useEffect(() => {
    fetchAppointmentDetails();
  }, [fetchAppointmentDetails]);

  const updateAppointmentStatus = async (id, statusId) => {
    try {
      await apiSend(`/appointment/updateStatus`, 'POST', {appointmentId: id, statusId: statusId})
      setAppointmentDetails(prev => prev.map(r => r.appointmentId === id ? { ...r, statusId: statusId } : r))
    } catch (e) { toast({ title: 'Confirm failed', description: e.message, status: 'error' }) }
  }

  return { appointmentDetails, fetchAppointmentDetails, updateAppointmentStatus };
}
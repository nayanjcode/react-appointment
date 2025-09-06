import { useCallback, useEffect, useState } from "react";
import { apiGet, apiSend } from "../utils/api";
import { useToast } from "@chakra-ui/react";
import { APPOINTMENT_STATUS } from "../constants";

export const useGetAppointmentDetails = (companyId, filter) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const toast = useToast();

  const [isLoadingAppointments, setIsLoadingAppointments] = useState(true);

  const fetchAppointmentDetails = useCallback(() => {
    const request = {};
    request.companyId = companyId ? companyId : 0;
    request.filter = filter;
    request.tzOffset = new Date().getTimezoneOffset() * 60;
    setIsLoadingAppointments(true);
    apiSend(`/appointment/getAppointments`, 'POST', request)
      .then((appointmentData) => {
        const formattedAppointments = appointmentData.map(ap => {
          return { ...ap.appointment, ...ap.customerDetails }
        });
        console.log("formattedAppointments :", formattedAppointments);
        setAppointmentDetails(formattedAppointments)
        setIsLoadingAppointments(false);
      })
      .catch(e => 
        {
          toast({ title: 'Load failed', description: e.message, status: 'error' })
          setIsLoadingAppointments(false);
        }
      )
  }, [filter, companyId]);

  useEffect(() => {
    fetchAppointmentDetails();
  }, [fetchAppointmentDetails]);

  const updateAppointmentStatus = async (id, statusId, cleanup) => {
    try {
      await apiSend(`/appointment/updateStatus`, 'POST', {appointmentId: id, statusId: statusId})
      setAppointmentDetails(prev => prev.map(r => r.appointmentId === id ? { ...r, statusId: statusId } : r))

    } catch (e) {
      toast({ title: 'Confirm failed', description: e.message, status: 'error' });
    } finally {
      cleanup();
    }
  }

  return { appointmentDetails, fetchAppointmentDetails, updateAppointmentStatus, isLoadingAppointments };
}
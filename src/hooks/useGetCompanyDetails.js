import { useCallback, useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { useToast } from "@chakra-ui/react";

export const useGetCompanyDetails = (companyId) => {
    const [companyDetails, setCompanyDetails] = useState(null);
    const [appointmentStatusInfo, setAppointmentStatusInfo] = useState([])
    const [appointmentServicesInfo, setAppointmentServicesInfo] = useState([])
    const toast = useToast();

    useEffect(() => {

        const fetchCompanyDetails = async () => {
            try {
                const response = await apiGet(`/appointment/companyDetails?companyId=${companyId ? companyId : ''}`);
                setCompanyDetails(response);
            } catch (error) {
                toast({ title: 'Error fetching company details', description: error.message, status: 'error' });
            }
        };

        fetchCompanyDetails();
    }, [companyId, toast]);

    const fetchAppointmentStatusData = useCallback(() => {
        apiGet(`/appointment/allStatusInfo?companyId=${companyId}`)
            .then(setAppointmentStatusInfo)
            .catch(e => toast({ title: 'Load failed', description: e.message, status: 'error' }))
    }, [companyId])

    const fetchServicesData = useCallback(() => {
        apiGet(`/appointment/allServiceInfo?companyId=${companyId}`)
            .then((services) => setAppointmentServicesInfo(services.map(service => service.service)))
            .catch(e => toast({ title: 'Load failed', description: e.message, status: 'error' }))
    }, [companyId])

    const getStatusFromId = useCallback((id) => {
        if (appointmentStatusInfo) {
            const status = appointmentStatusInfo.find(s => s.statusId == id);
            return status ? status.statusName.toUpperCase() : '';
        }
        return '';
    }, [appointmentStatusInfo]);

    const getServiceFromId = useCallback((id) => {
        if (appointmentServicesInfo) {
            const service = appointmentServicesInfo.find(s => s.serviceId == id);
            return service ? service.serviceName.toUpperCase() : '';
        }
        return '';
    }, [appointmentServicesInfo]);

    useEffect(() => {
        fetchAppointmentStatusData();
        fetchServicesData();
    }, [fetchAppointmentStatusData, fetchServicesData]);


    return { companyDetails, appointmentStatusInfo, appointmentServicesInfo, getStatusFromId, getServiceFromId };
}
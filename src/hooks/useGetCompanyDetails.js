import { useCallback, useEffect, useState } from "react";
import { apiGet } from "../utils/api";
import { useToast } from "@chakra-ui/react";
import { set } from "react-hook-form";

export const useGetCompanyDetails = (companyId) => {
    const [companyDetails, setCompanyDetails] = useState(null);
    const [appointmentStatusInfo, setAppointmentStatusInfo] = useState([])
    const [appointmentServicesInfo, setAppointmentServicesInfo] = useState([])

    const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(true);
    const [isLoadingServicesData, setIsLoadingServicesData] = useState(true);
    const [isLoadingStatusData, setIsLoadingStatusData] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {

        const fetchCompanyDetails = async () => {
            try {
                setIsLoadingCompanyData(true);
                const response = await apiGet(`/appointment/companyDetails?companyId=${companyId ? companyId : ''}`);
                setCompanyDetails(response);
                setIsLoadingCompanyData(false);
            } catch (error) {
                setIsLoadingCompanyData(false);
                toast({ title: 'Error fetching company details', description: error.message, status: 'error' });
            }
        };

        fetchCompanyDetails();
    }, [companyId, toast]);

    const fetchAppointmentStatusData = useCallback(() => {
        setIsLoadingStatusData(true);
        apiGet(`/appointment/allStatusInfo?companyId=${companyId}`)
            .then((statusInfo) => {
                setAppointmentStatusInfo(statusInfo)
                setIsLoadingStatusData(false);
            })
            .catch(e =>
                {
                    setIsLoadingStatusData(false);
                    toast({ title: 'Load failed', description: e.message, status: 'error' })
                })
    }, [companyId])

    const fetchServicesData = useCallback(() => {
        setIsLoadingServicesData(true);
        apiGet(`/appointment/allServiceInfo?companyId=${companyId}`)
            .then((services) => 
                {
                    setIsLoadingServicesData(false); 
                    setAppointmentServicesInfo(services.map(service => service.service))
                }
            )
            .catch(e =>
                {
                    setIsLoadingServicesData(false)
                    toast({ title: 'Load failed', description: e.message, status: 'error' })
                })
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

    useEffect(() => {
        setIsLoading(isLoadingCompanyData || isLoadingStatusData || isLoadingServicesData);
    }, [isLoadingCompanyData, isLoadingStatusData, isLoadingServicesData]);

    return { companyDetails, appointmentStatusInfo, appointmentServicesInfo, getStatusFromId, getServiceFromId, isLoading };
}
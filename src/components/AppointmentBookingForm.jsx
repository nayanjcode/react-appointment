import { Input, Button, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { apiGet, apiSend } from "../utils/api";
import { Select } from "chakra-react-select";

export const AppointmentBookingForm = ({ services, onSuccess }) => {
  const [companyId, setCompanyId] = useState("1");
  const [serviceOptions, setServiceOptions] = useState([]);
  const [nextAppointmentTime, setNextAppointmentTime] = useState(
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date())
  );
  const [form, setForm] = useState({
    serviceIds: [],
    appointmentDate: nextAppointmentTime,
    fname: "",
    lname: "",
    email: "",
    phone: "",
  });
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const toast = useToast();

  const fetchNextAppointmentTime = useCallback(() => {
    apiGet(`/appointment/findNextAppointmentTime?companyId=${companyId}`)
      .then((latestSlot) =>
        setNextAppointmentTime(
          new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(new Date(latestSlot))
        )
      )
      .catch((e) =>
        toast({
          title: "Getting latest appointment time failed",
          description: e.message,
          status: "error",
        })
      );
  }, [companyId]);

  const submit = async () => {
    if (
      !form.serviceIds ||
      !form.serviceIds.length ||
      !(form.fname || form.lname) ||
      !(form.phone || form.email)
    ) {
      toast({
        title: "Missing fields",
        description: "Please complete the form.",
        status: "warning",
      });
      return;
    }
    try {
      await apiSend("/appointment/bookAppointment", "POST", {
        serviceIds: form.serviceIds,
        // appointmentDateTime: form.date + "T" + form.time + ':00',
        appointmentDateTime: new Date(form.appointmentDate).toISOString(),
        customerFirstName: form.fname,
        customerLastName: form.lname,
        phone: form.phone,
        email: form.email,
        companyId: Number(companyId),
      });
      toast({
        title: "Booking submitted",
        description: "Awaiting admin confirmation.",
        status: "success",
      });
      setForm({
        serviceIds: [serviceOptions[0]],
        appointmentDate: nextAppointmentTime,
        time: "",
        fname: "",
        lname: "",
        phone: "",
        email: "",
      });
      onSuccess();
    } catch (e) {
      toast({
        title: "Booking failed",
        description: e.message || "Slot may be taken.",
        status: "error",
      });
    }
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  useEffect(() => {
    let serviceOpts = [];
    if (services && services.length) {
      serviceOpts = services.map((service) => {
        return {
          label: service.serviceName,
          value: service.serviceId,
        };
      });
    }
    setServiceOptions(serviceOpts);
  }, [services]);

  useEffect(() => {
    if (serviceOptions && serviceOptions.length)
    {
      setForm(form => {
        return {
          ...form,
          serviceIds: [serviceOptions[0].value]
        }
      })
    }
  }, [serviceOptions]);

  useEffect(() => {
    fetchNextAppointmentTime();
  }, [fetchNextAppointmentTime]);

  return (
    <Box
      maxW="lg"
      mx="auto"
      p={6}
      my="4"
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      boxShadow="sm"
    >
      <Heading size="lg" mb={4}>
        Book Your Appointment
      </Heading>
      <VStack spacing={4} align="stretch">
        <Select
          placeholder="Select Service"
          name="serviceId"
          value={serviceOptions.filter((s) => form.serviceIds.includes(s.value))}
          onChange={(value) => {
            console.log(value);
            setForm((prev) => ({ ...prev, serviceIds: value.map(v => v.value) }));
          }}
          options={serviceOptions}
          isClearable={false}
          isSearchable={true}
          isMulti={true}
          hideSelectedOptions={false}
        />
        {/* <Input type="date" name="date" value={form.date} onChange={handleChange} />
        <Input type="time" name="time" value={form.time} onChange={handleChange} /> */}
        <HStack>
          <Input name="appointmentDate" value={nextAppointmentTime} readOnly />
          <Button onClick={() => fetchNextAppointmentTime()} maxW="100px">
            Refresh
          </Button>
        </HStack>
        <Input
          placeholder="First Name"
          name="fname"
          value={form.fname}
          onChange={handleChange}
        />
        <Input
          placeholder="Last Name"
          name="lname"
          value={form.lname}
          onChange={handleChange}
        />
        <Input
          placeholder="Email (Optional if Phone provided)"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Phone (Optional if Email provided)"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <Button colorScheme="blue" onClick={submit}>
          Book Appointment
        </Button>
        <Text fontSize="sm" color="gray.500">
          After booking, an admin will confirm or cancel your request.
        </Text>
      </VStack>
    </Box>
  );
};

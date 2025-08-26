import { Box, Button, HStack, Input } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React, { useEffect, useState } from "react";

export const AppointmentFilter = ({
  isAdmin,
  companyId,
  filter,
  setFilter,
  applyFilter,
  appointmentStatusInfo
}) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <HStack spacing={4}>
      <Input
        maxW="250px"
        type="date"
        value={filter.date}
        onChange={(e) => setFilter({ ...filter, date: e.target.value })}
      />
      {isAdmin ? <Box w="100%" maxW="500px">
        <Select
          placeholder="Select Status"
          value={filter.status.map(s => ({ value: s, label: appointmentStatusInfo.find(a => a.statusId === s)?.statusName || '' }))}
          onChange={(values) => setFilter({ ...filter, status: values ? values.map(v => v.value) : [] })}
          options={appointmentStatusInfo?.map(s => ({ value: s.statusId, label: s.statusName }))}
          isClearable={false}
          isMulti={true}
          hideSelectedOptions={false}
        />
      </Box> : null}
      <Button sx={{ w: "100%", maxW: "200px" }} onClick={applyFilter} colorScheme="blue">
        Refresh
      </Button>
    </HStack>
  );
};

import { Box, Button, HStack, Input, VStack } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React, { useEffect, useState } from "react";

export const AppointmentFilter = ({
  isAdmin,
  companyId,
  filter,
  setFilter,
  applyFilter,
  appointmentStatusInfo,
}) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <Box
      w="100%"
      display={{ base: "block", lg: "flex" }}
      justifyContent="center"
      alignItems="center"
      py={{ base: 2, md: 4 }}
    >
      <HStack
        spacing={{ base: 2, md: 4, lg: 8 }}
        w="100%"
        alignItems="center"
        flexWrap="wrap"
        justifyContent={{ base: "center", lg: "flex-start" }}
      >
        <Input
          maxW={{ base: "100%", md: "250px" }}
          type="date"
          value={filter.date}
          onChange={(e) => setFilter({ ...filter, date: e.target.value })}
          flexShrink={0}
        />
        {isAdmin ? (
          <Box w={{ base: "100%", md: "300px", lg: "400px" }}>
            <Select
              placeholder="Select Status"
              value={filter.status.map((s) => ({
                value: s,
                label:
                  appointmentStatusInfo.find((a) => a.statusId === s)
                    ?.statusName || "",
              }))}
              onChange={(values) =>
                setFilter({
                  ...filter,
                  status: values ? values.map((v) => v.value) : [],
                })
              }
              options={appointmentStatusInfo?.map((s) => ({
                value: s.statusId,
                label: s.statusName,
              }))}
              isClearable={false}
              isMulti={true}
              hideSelectedOptions={false}
            />
          </Box>
        ) : null}
        <Button
          w={{ base: "100%", md: "200px", lg: "200px" }}
          onClick={applyFilter}
          colorScheme="blue"
          flexShrink={0}
        >
          Refresh
        </Button>
      </HStack>
    </Box>
  );
};

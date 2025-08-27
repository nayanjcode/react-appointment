import {
  Box,
  Button,
  HStack,
  Input,
  VStack,
  Collapse,
  IconButton,
} from "@chakra-ui/react";
// ...existing code...
import { Select } from "chakra-react-select";
import React from "react";
import { FaSync } from "react-icons/fa";

export const AppointmentFilter = ({
  isAdmin,
  companyId,
  filter,
  setFilter,
  applyFilter,
  appointmentStatusInfo,
  showFilters,
}) => {
  return (
    <Box w="100%" mb={2}>
      <Collapse in={showFilters} animateOpacity>
        <Box
          w="100%"
          bg="white"
          boxShadow="sm"
          borderRadius="xl"
          p={{ base: 2, md: 4 }}
        >
          <HStack
            spacing={{ base: 2, md: 4, lg: 8 }}
            w="100%"
            alignItems="center"
            flexWrap="wrap"
            justifyContent="flex-start"
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
                  menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                  }
                  menuPosition="fixed"
                />
              </Box>
            ) : null}
          </HStack>
        </Box>
      </Collapse>
    </Box>
  );
};

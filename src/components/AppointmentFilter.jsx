import { Box, Button, HStack, Input, VStack, IconButton, useDisclosure } from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa";
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
  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: false });

  return (
    <>
      {!isOpen && (
        <IconButton
          icon={<FaFilter />}
          aria-label="Show filters"
          position="fixed"
          bottom={{ base: 20, md: 24 }}
          right={{ base: 4, md: 10 }}
          zIndex={1200}
          colorScheme="blue"
          size="lg"
          boxShadow="md"
          borderRadius="full"
          onClick={onOpen}
        />
      )}
      {isOpen && (
        <Box
          position="fixed"
          left={0}
          bottom={0}
          w="100%"
          zIndex={1200}
          bg="white"
          boxShadow="0 -2px 12px rgba(0,0,0,0.08)"
          p={{ base: 2, md: 4 }}
          borderTopRadius="xl"
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
            <Button
              variant="ghost"
              colorScheme="gray"
              onClick={onClose}
              ml={2}
            >
              Hide Filters
            </Button>
          </HStack>
        </Box>
      )}
    </>
  );
};

import { Spinner } from "@chakra-ui/react";

export const AppointmentSpinner = ({isLoading, ...props}) => {
    return (
        <Spinner
            isLoading={isLoading}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            {...props}
        />
    );
};
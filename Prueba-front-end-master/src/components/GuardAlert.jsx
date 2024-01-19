import { Alert, AlertIcon, Box, CloseButton } from "@chakra-ui/react";
import PropTypes from "prop-types";

export const GuardAlert = ({ show, message, type, onClose }) => {
  if (!show) {
    return <></>;
  }
  return (
    <Alert status={type} variant="solid" gap={1}>
      <AlertIcon />
      <Box flex="1" noOfLines={3}>
        {message}
      </Box>
      {onClose && (
        <CloseButton
          alignSelf="self-start"
          onClick={onClose}
          position="relative"
          right={-1}
          top={-1}
        />
      )}
    </Alert>
  );
};
GuardAlert.propTypes = {
  show: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.object,
};

import {
  Box,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import PropTypes from "prop-types";
import { todayFormatted } from "../constants/Dates";
import { GuardAlert } from "./GuardAlert";
import { instanceGuards } from "../constants/Url";

const NewGuardFormView = ({ idTeam, token }) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    defaultValues: {
      guardDate: todayFormatted,
    },
  });
  const [addGuardAlertProps, setAddGuardAlertProps] = useState({
    show: false,
    message: "",
    type: "",
  });

  const addGuard = async ({ guardDate }) => {
    try {
      instanceGuards.defaults.headers.common["AuthToken"] = `${token}`;
      const { data } = await instanceGuards.post(
        `equipo/${idTeam}/agente/postulante?tipo_guardia=1&fecha_guardia=${guardDate}`
      );
      //
      if (data.includes("(e)")) {
        throw new Error(data);
      } else {
        setAddGuardAlertProps({
          show: true,
          type: "success",
          message: data,
        });
      }
    } catch (error) {
      setAddGuardAlertProps({
        show: true,
        type: "error",
        message: error.message,
      });
    }
  };

  const handleAlertClose = () =>
    setAddGuardAlertProps({ ...addGuardAlertProps, show: false });

  return (
    <Box
      boxShadow="dark-lg"
      as="form"
      padding={{ base: "4", sm: "6" }}
      maxWidth="lg"
      marginX="auto"
      marginY="8"
      onSubmit={handleSubmit(addGuard)}
      backgroundColor="#DAFDBA"
    >
      <Text as="b" fontSize="2xl">
        Agregar Guardia
      </Text>
      <FormControl id="guardDate" isInvalid={errors?.guardDate?.type}>
        <FormLabel>Fecha de Guardia</FormLabel>
        <Controller
          name="guardDate"
          control={control}
          render={({ field }) => <Input type="date" width="100%" {...field} />}
          rules={{ required: true }}
        />
        <FormErrorMessage> La fecha de guardia es requerida</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        colorScheme="teal"
        marginX="auto"
        marginY="2"
        width="100%"
        isLoading={isSubmitting}
      >
        Enviar
      </Button>
      <GuardAlert {...addGuardAlertProps} onClose={handleAlertClose} />
    </Box>
  );
};
NewGuardFormView.propTypes = {
  idTeam: PropTypes.string,
  token: PropTypes.string,
};
export default NewGuardFormView;

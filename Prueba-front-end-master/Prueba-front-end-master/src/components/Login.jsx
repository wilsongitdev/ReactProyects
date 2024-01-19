import {
  Heading,
  Box,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GuardAlert } from "./GuardAlert";
import { instanceLoggin } from "../constants/Url";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      usuario: "",
      password: "",
    },
  });
  const [errorAlertProps, setErrorAlertProps] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const navigate = useNavigate();
  const onSubmit = async ({ usuario, password }) => {
    try {
      const { data } = await instanceLoggin.post(
        `validar_usuario?usuario=${usuario}&password=${password}`
      );
      if (data.owl) {
        navigate("/guards", {
          state: { idTeam: data.id_equipo, token: data.owl },
        });
      } else {
        reset({});
        throw new Error(data.msg);
      }
    } catch (error) {
      setErrorAlertProps({
        ...errorAlertProps,
        show: true,
        message: error.message,
      });
    }
  };

  return (
    <main>
      <Heading
        size="3xl"
        as="header"
        paddingY="5"
        backgroundColor="ButtonHighlight"
      >
        NTT DATA LOGIN
      </Heading>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80vh"
        backgroundColor="orange.50"
      >
        <Box
          boxShadow="dark-lg"
          as="form"
          padding={{ base: "4", sm: "6" }}
          borderRadius="md"
          width="350px"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Text as="b" fontSize="2xl">
            Inicio de sesión
          </Text>
          <FormControl id="usuario" isInvalid={errors.usuario}>
            <FormLabel>Usuario</FormLabel>
            <Input
              type="text"
              placeholder="Ingrese su usuario"
              autoComplete="off"
              {...register("usuario", { required: true })}
            />
            <FormErrorMessage>Debe ingresar su usuario</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={errors.password} my={4}>
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              placeholder="Ingrese su contraseña"
              autoComplete="off"
              {...register("password", { required: true })}
            />
            <FormErrorMessage>Debe ingresar su contraseña</FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            marginX="auto"
            marginY="2"
            width="100%"
            isLoading={isSubmitting}
          >
            Enviar
          </Button>
          <GuardAlert {...errorAlertProps} />
        </Box>
      </Box>
    </main>
  );
}

export default Login;

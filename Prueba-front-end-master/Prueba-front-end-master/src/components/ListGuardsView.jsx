import { VStack, Text, Flex, IconButton, Input } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { CalendarIcon } from "@chakra-ui/icons";
import { endDateFormatted, startDateFormatted } from "../constants/Dates";
import TableGuards from "./TableGuards";
import { useState, useEffect } from "react";
import { instanceGuards } from "../constants/Url";
import PropTypes from "prop-types";

const ListGuardsView = ({ idTeam, token }) => {
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      startDate: startDateFormatted,
      endDate: endDateFormatted,
    },
  });

  const [isLoadingDataTable, setIsLoadingDataTable] = useState(true);
  const [guards, setGuards] = useState([]);

  const validateEndDate = (value) => {
    const startDate = watch("startDate");
    return startDate && value < startDate
      ? "La fecha de fin debe ser posterior a la fecha de inicio"
      : true;
  };

  useEffect(() => {
    const getGuards = async () => {
      try {
        instanceGuards.defaults.headers.common["AuthToken"] = `${token}`;
        const { data } = await instanceGuards.get(
          `equipo/${idTeam}?fecha_ini=${watch("startDate")}&fecha_fin=${watch(
            "endDate"
          )}`
        );

        setIsLoadingDataTable(false);
        setGuards(data);
      } catch (error) {
        console.error("Error en la petición:" + error.message);
        alert("Error en la petición:" + error.message);
      }
    };
    if (isLoadingDataTable) getGuards();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingDataTable]);
  return (
    <>
      <Text fontSize="xl" as="b" textAlign={{ base: "left", md: "center" }}>
        Listado de guardias
      </Text>
      <VStack>
        <Flex gap="2" alignItems="center" wrap={{ base: "wrap", sm: "unwrap" }}>
          <Text as="label" htmlFor="startDate">
            Desde:
          </Text>
          <Controller
            name="startDate"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                id="startDate"
                type="date"
                width={{ base: "100%", md: "auto" }}
                {...field}
              />
            )}
          />

          <Text as="label" htmlFor="endDate">
            Hasta:
          </Text>
          <Controller
            name="endDate"
            control={control}
            rules={{ validate: validateEndDate, required: true }}
            render={({ field }) => (
              <Input
                id="endDate"
                type="date"
                width={{ base: "100%", md: "auto" }}
                {...field}
              />
            )}
          />

          <IconButton
            icon={<CalendarIcon />}
            colorScheme="teal"
            width={{ base: "100%", sm: "auto" }}
            aria-label="filtrar"
            isLoading={isLoadingDataTable}
            isDisabled={isLoadingDataTable}
            onClick={handleSubmit(setIsLoadingDataTable)}
          />
        </Flex>
      </VStack>
      <VStack>
        <Text fontSize="md" color="red" as="b">
          {errors?.endDate?.message}
        </Text>
      </VStack>
      <TableGuards isLoadingDataTable={isLoadingDataTable} lGuards={guards} />
    </>
  );
};
ListGuardsView.propTypes = {
  token: PropTypes.string.isRequired,
  idTeam: PropTypes.string.isRequired,
};
export default ListGuardsView;

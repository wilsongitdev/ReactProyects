import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Spinner,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

function TableGuards({ lGuards, isLoadingDataTable }) {
  if (isLoadingDataTable) {
    return (
      <Spinner
        thickness="6px"
        size="xl"
        speed="0.65s"
        emptyColor="gray.300"
        color="blue.500"
      />
    );
  }
  return (
    <TableContainer>
      <Table variant="simple" colorScheme="blue" size="sm">
        <Thead>
          <Tr>
            <Th>Nombre del guardia</Th>
            <Th>estado</Th>
            <Th>Email</Th>
            <Th>Rol</Th>
            <Th>Fecha Guardia</Th>
            <Th>Nombre equipo</Th>
            <Th>Estado equipo</Th>
          </Tr>
        </Thead>
        <Tbody>
          {lGuards.map((item, id) => (
            <Tr key={id}>
              <Td>{item.agente.nom_agente}</Td>
              <Td>{item.agente.estado_agente}</Td>
              <Td>{item.agente.email_agente}</Td>
              <Td>{item.agente.rol.nom_rol}</Td>
              <Td>{item.fecha_guardia}</Td>
              <Td>{item.agente.equipo.nombre_eq}</Td>
              <Td>{item.agente.equipo.estado_equipo}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

TableGuards.propTypes = {
  lGuards: PropTypes.array.isRequired,
  isLoadingDataTable: PropTypes.bool,
};

export default TableGuards;

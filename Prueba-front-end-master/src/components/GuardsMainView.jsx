import { Heading, Container, Box } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import NewGuardFormView from "./NewGuardFormView";
import ListGuardsView from "./ListGuardsView";

function GuardsMainView() {
  const location = useLocation();
  const dataLocation = {
    idTeam: location.state?.idTeam,
    token: location.state?.token,
  };

  return (
    <>
      <Heading
        as="header"
        size="3xl"
        paddingY="5"
        backgroundColor="#070f26"
        color="white"
      >
        NTT DATA TEST
      </Heading>
      <Box as="section" id="listGuard" padding="10" backgroundColor="#13678A">
        <Container maxW="container.lg" backgroundColor="#DAFDBA">
          <ListGuardsView {...dataLocation} />
        </Container>
      </Box>
      <Box as="section" id="newGuardForm" backgroundColor="#45C4B0">
        <Container maxW="container.lg" py={10}>
          <NewGuardFormView {...dataLocation} />
        </Container>
      </Box>
    </>
  );
}
export default GuardsMainView;

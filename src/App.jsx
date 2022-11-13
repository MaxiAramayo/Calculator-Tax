import { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  UnorderedList,
  ListItem,
  Image,
} from "@chakra-ui/react";
import { useEffect } from "react";
import DivisaArg from "../components/DivisaArg";
import DivisaEEUU from "../components/DivisaEEUU";
import banderaARG from "./assets/BanderaARG.svg";
import banderaEEUU from "./assets/BanderaEEUU.svg";

function App() {
  const ApiUrl = "https://www.dolarsi.com/api/api.php?type=dolar";

  const [dolarOficial, setdolarOficial] = useState(0);
  const [dolarBlue, setdolarBlue] = useState(0);
  const [dolarBancoNacion, setdolarBancoNacion] = useState(0);
  const [dolarBancoMayorista, setdolarBancoMayorista] = useState(0);

  const fetchApi = async () => {
    const response = await fetch(ApiUrl);
    const datainfo = await response.json();
    console.log(datainfo);
    setdolarOficial(datainfo[0].casa.venta);
    setdolarBlue(datainfo[1].casa.venta);
    setdolarBancoNacion(datainfo[4].casa.venta);
    setdolarBancoMayorista(datainfo[2].casa.venta);
  };

  console.log("dolar official", dolarOficial);
  console.log("dolar blue", dolarBlue);

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <Stack spacing={3}>
      <Box textAlign={"center"} p="5">
        <Text fontSize={{ base: "2xl", lg: "4xl" }} fontWeight="bold">
          Calculadora de impuestos
        </Text>
      </Box>

      <Stack justify="center">
        <Box roundedBottom={10} mx="auto" shadow="2xl">
          <Tabs isFitted shadow="2xl" colorScheme="none" size="lg">
            <TabList>
              <Tab fontSize="lg" fontWeight="bold">
                <Image src={banderaARG} h="25px" mr="5px" rounded="5" /> ARG
              </Tab>
              <Tab fontSize="lg" fontWeight="bold">
                <Image src={banderaEEUU} h="25px" mr="5px" rounded="5" /> USD
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <DivisaArg dolarOficial={dolarOficial} dolarBlue={dolarBlue} />

                <Box p="5" mt="40px" bg="blue.200" rounded="10">
                  <Text fontWeight="semibold"> Cotizaciones: </Text>
                  <UnorderedList>
                    <ListItem>
                      <Text fontWeight="semibold">
                        Dolar Oficial $ {dolarOficial}
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="semibold">
                        Dolar Blue $ {dolarBlue}
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="semibold">
                        Dolar Banco Nacion $ {dolarBancoNacion}
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="semibold">
                        Dolar Banco Mayorista $ {dolarBancoMayorista}
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </Box>
              </TabPanel>
              <TabPanel>
                <DivisaEEUU dolarOficial={dolarOficial} dolarBlue={dolarBlue} />

                <Box p="5" mt="40px" bg="blue.200" rounded="10">
                  <Text fontWeight="semibold"> Cotizaciones: </Text>
                  <UnorderedList>
                    <ListItem>
                      <Text fontWeight="semibold">
                        Dolar Oficial $ {dolarOficial}
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="semibold">
                        Dolar Blue $ {dolarBlue}
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="semibold">
                        Dolar Banco Nacion $ {dolarBancoNacion}
                      </Text>
                    </ListItem>
                    <ListItem>
                      <Text fontWeight="semibold">
                        Dolar Banco Mayorista $ {dolarBancoMayorista}
                      </Text>
                    </ListItem>
                  </UnorderedList>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
      <Box>
        <Text fontSize="md" textAlign="center">
          Desarrollado por: <a href="">@MaxiDev</a>
        </Text>
      </Box>
    </Stack>
  );
}

export default App;

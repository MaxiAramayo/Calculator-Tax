import {
  Button,
  Input,
  Stack,
  Text,
  Box,
  Grid,
  InputGroup,
  InputLeftElement,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function DivisaArg({ dolarOficial, dolarBlue }) {
  // console.log(dolarOficial);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [PesosConImpuestos, setPesosConImpuestos] = useState(0);
  const [PesosConImpuestoPais, setPesosConImpuestoPais] = useState(0);
  const [PesosConImpuestoBanco, setPesosConImpuestoBanco] = useState(0);
  const [DolaresConImpuestos, setDolaresConImpuestos] = useState(0);

  const onSubmit = ({ monto }) => {
    //pasar dolares a pesos
    const pesos = parseFloat(monto) * parseFloat(dolarOficial);

    //se le aplica el 30% de impuesto Pais al monto ingresado
    const impuestoPais = parseFloat(pesos) * 0.3;
    setPesosConImpuestoPais(impuestoPais);
    //se le aplica el 45% de impuesto exterior al monto ingresado
    const impuestoExterior = parseFloat(pesos) * 0.45;
    setPesosConImpuestoBanco(impuestoExterior);
    // se los suma y queda el total de impuestos

    const totalImpuestos = parseFloat(pesos) + impuestoPais + impuestoExterior;

    setPesosConImpuestos(totalImpuestos);
  };

  return (
    <Stack mt={{ base: "5px", lg: "40px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          flexDirection="row"
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
          templateRows={{ base: "repeat(3, 1fr)", lg: "repeat(1, 1fr)" }}
          justifyItems="center"
          justifyContent="center"
          alignItems="center"
          gap={{ base: "10px" }}
          py="auto"
          width={{ base: "292px", lg: "430px" }}
        >
          <Text fontSize="md" fontWeight="bold" p="8px">
            Monto en USD
          </Text>

          <Box>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                children="$"
              />
              <Input
                variant="filled"
                colorScheme="whatsapp.500"
                type="float"
                placeholder="17.50 USD"
                {...register("monto", {
                  required: true,
                  min: 0.1,
                  max: 999999,
                })}
              />
            </InputGroup>
            {errors.monto?.type === "required" && (
              <Badge colorScheme="red">campo obligatorio</Badge>
            )}
            {errors.monto?.type === "min" && (
              <Badge colorScheme="red">minimo 0.1</Badge>
            )}
            {errors.monto?.type === "max" && (
              <Badge colorScheme="red">maximo 999999</Badge>
            )}
          </Box>
          <Button
            type="submit"
            colorScheme="whatsapp"
            w={{ base: "241px", lg: "auto" }}
          >
            Calcular
          </Button>
        </Grid>
      </form>

      {PesosConImpuestos > 0 && (
        <Stack gap="1">
          <Box alignItems="center" align="space-beetween" display="flex">
            <Text ml="10px" fontSize="md" fontWeight="semibold">
              Impuesto pais (30%):
            </Text>

            <Text ml="5px" fontWeight="bold">
              ${PesosConImpuestoPais}
            </Text>
          </Box>

          <Box alignItems="center" align="space-beetween" display="flex">
            <Text ml="10px" fontSize="md" fontWeight="semibold" direction="row">
              Impuesto exterior (45%):
            </Text>

            <Text ml="5px" fontWeight="bold">
              {" "}
              ${PesosConImpuestoBanco}{" "}
            </Text>
          </Box>

          <Box
            align="space-beetween"
            alignItems="center"
            display="flex"
            bg="whatsapp.100"
            rounded="lg"
            h="40px"
            mb="10px"
          >
            <Text
              ml="10px"
              fontSize="md"
              fontWeight="bold"
              color="whatsapp.500"
            >
              Total en pesos:
            </Text>

            <Text ml="5px" fontWeight="bold" color="whatsapp.500">
              ${PesosConImpuestos.toFixed(2)}
            </Text>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}

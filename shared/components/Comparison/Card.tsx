import { useCallback, useState } from "react";
import { useTranslation } from "next-i18next";
import { Box, Flex, GridItem, Icon, IconButton, Text } from "@chakra-ui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import Pagination from "../Pagination";
import StateInfo from "../StateInfo";

import { StatesResponse } from "../../types/airtable";
import { INFO_ACCESS } from "../../utils/buildCaseFilters";

function ComparisonHeader({
  children,
  gradient,
  setSelectedState,
}: {
  gradient: string;
  children: React.ReactNode;
  setSelectedState: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const { t } = useTranslation("home");

  const handleResetState = useCallback(() => {
    setSelectedState(null);
  }, [setSelectedState]);

  return (
    <Flex
      bgColor={`brand.gradient.${gradient}.primary`}
      px={4}
      w={"full"}
      h={12}
      align={"center"}
      justify={"center"}
      position={"relative"}
    >
      <Text fontSize={"xl"} color={"white"} fontWeight={700}>
        {children}
      </Text>
      <IconButton
        icon={<Icon as={XMarkIcon} boxSize={4} />}
        aria-label={t("comparison.unselectState")}
        variant={"unstyled"}
        borderRadius={"full"}
        border={"2px solid white"}
        size={"xs"}
        color={"white"}
        position={"absolute"}
        right={4}
        display={"inline-flex"}
        alignItems={"center"}
        onClick={handleResetState}
      />
    </Flex>
  );
}

export default function ComparisonCard({
  state,
  setSelectedState,
  selectedPeriod,
}: {
  state: StatesResponse;
  setSelectedState: React.Dispatch<React.SetStateAction<string | null>>;
  selectedPeriod: string;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const degree = state.estado_basico__grau_institucionalizacao;
  const gradient = INFO_ACCESS[degree];
  const filteredState = {
    ...state,
    orgaos: state.orgaos?.filter((orgao) => orgao.periodo === selectedPeriod),
  };

  return (
    <GridItem h={"3xl"}>
      <Box
        borderRadius={"lg"}
        border={"1px solid"}
        borderColor={"brand.primary"}
        overflow={"hidden"}
        position={"relative"}
      >
        <ComparisonHeader
          gradient={gradient}
          setSelectedState={setSelectedState}
        >
          {state.estado__nome}
        </ComparisonHeader>

        <Box py={5} px={2} overflowY={"scroll"} h={"2xl"}>
          <StateInfo
            gradient={gradient}
            stateInfo={filteredState}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </Box>

        {filteredState.orgaos && filteredState.orgaos.length > 1 ? (
          <Flex
            bgColor={""}
            w={"full"}
            h={"2.5rem"}
            align={"center"}
            justify={"center"}
          >
            <Pagination
              page={activeIndex ? activeIndex + 1 : 1}
              setPage={setActiveIndex}
              gradient={gradient}
            />
          </Flex>
        ) : null}
      </Box>
    </GridItem>
  );
}

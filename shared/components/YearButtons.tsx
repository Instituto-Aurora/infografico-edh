import { Select } from "@chakra-ui/react";
import { type Dispatch, type SetStateAction } from "react";
import { css } from "@emotion/react";

type YearButtonsProp = {
  years: string[];
  selectedPeriod: string;
  selectPeriod: Dispatch<SetStateAction<string>>;
};

export default function YearButtons({
  years,
  selectedPeriod,
  selectPeriod,
}: YearButtonsProp) {
  return years.length > 0 ? (
    <Select
      value={selectedPeriod}
      onChange={(e) => selectPeriod(e.target.value)}
      maxW="200px"
      fontSize="lg"
      fontWeight="bold"
      bgColor="#62426E"
      color="#F4F0EF"
      borderColor="#F4F0EF"
      borderWidth="2px"
      borderRadius="md"
      _hover={{ bgColor: "#7D5A89" }}
      css={css`
        option {
          background-color: rgb(255, 255, 255);
          color: #62426e;
        }
      `}
    >
      {years.map((year, i) => (
        <option key={`year-option-${i}`} value={year}>
          {year}
        </option>
      ))}
    </Select>
  ) : null;
}

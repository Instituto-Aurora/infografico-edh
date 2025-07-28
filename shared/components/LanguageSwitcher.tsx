// shared/components/LanguageSwitcher.tsx
import { Button, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const languageNames: Record<string, string> = {
  "pt-BR": "Português (Brasil)",
  es: "Español",
  en: "English",
};
export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, locales, asPath, pathname, query } = router;

  const changeLanguage = (lng: string) => {
    router.push({ pathname, query }, asPath, { locale: lng });
  };

  return (
    <HStack spacing={2}>
      {locales?.map((lng) => (
        <Button
          key={lng}
          onClick={() => changeLanguage(lng)}
          bgColor={locale === lng ? "#7D5A89" : "#62426E"}
          color="#F4F0EF"
          borderColor="#F4F0EF"
          borderWidth="2px"
          borderRadius="md"
          fontWeight="bold"
          _hover={{ bgColor: "#7D5A89" }}
          fontSize="sm"
          size="sm"
        >
          {languageNames[lng]}
        </Button>
      ))}
    </HStack>
  );
}

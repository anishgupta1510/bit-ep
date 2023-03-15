
import { ChakraProvider } from "@chakra-ui/react";
import { DataProvider } from "@/context/DataContext";
export default function App({ Component, pageProps }) {
  return (
    <DataProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </DataProvider>
  );
}

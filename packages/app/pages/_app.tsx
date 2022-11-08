import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MetaMaskProvider } from "metamask-react";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

export const graphClient = createGraphClient({
  url: "https://encrypted-sharable-production.up.railway.app/graphql",
  // url: "http://localhost:42069/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GraphProvider value={graphClient}>
      <MetaMaskProvider>
        <Component {...pageProps} />
      </MetaMaskProvider>
    </GraphProvider>
  );
}

export default MyApp;

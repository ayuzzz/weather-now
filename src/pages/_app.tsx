import RootLayout from "@/layouts/rootLayout";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Weather Now</title>
      </Head>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </>
  );
}

import "../app/globals.css";
import Layout from "../layout/default";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import Store from "../store/store";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted === false) {
    return null;
  }

  return (
    <Provider store={Store}>
      <Head>
        <title>Jason NFT Marketplace</title>
        <meta
          name="description"
          content="Discover a cutting-edge NFT marketplace designed for seamless buying, selling, and trading of digital assets. Connect with creators, explore unique collections, and unlock the future of digital ownership."
        />
        <meta
          name="og:description"
          content="Discover a cutting-edge NFT marketplace designed for seamless buying, selling, and trading of digital assets. Connect with creators, explore unique collections, and unlock the future of digital ownership."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link rel="icon" href="./Logo100.png" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

import '../../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { Analytics } from '@vercel/analytics/react';

import { chains, client } from '../wagmi'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <SessionProvider session={session}>
      <Analytics />
      <WagmiConfig client={client}>
        <RainbowKitProvider theme={darkTheme()} chains={chains}>
          {mounted && <Component {...pageProps} />}
        </RainbowKitProvider>
      </WagmiConfig>
    </SessionProvider>
  )
}

export default App

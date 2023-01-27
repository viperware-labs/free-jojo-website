import '../../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig, defaultChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import { Analytics } from '@vercel/analytics/react';
import { mainnet, goerli, sepolia } from 'wagmi/chains'

// import { chains, client } from '../wagmi'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, sepolia],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: 'NIxqzdZ3L05OGuEW1IrX0QRN5dYxgPGG',
    }),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'Free JoJo',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  return (
    <SessionProvider session={session}>
      <Analytics />
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider theme={darkTheme()} chains={chains}>
          {mounted && <Component {...pageProps} />}
        </RainbowKitProvider>
      </WagmiConfig>
    </SessionProvider>
  )
}

export default App

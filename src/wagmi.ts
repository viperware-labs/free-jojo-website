import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, defaultChains } from 'wagmi'
import { mainnet, goerli, sepolia } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/dist/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

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

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export { chains }

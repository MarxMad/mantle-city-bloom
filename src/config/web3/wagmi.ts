import { http, createConfig } from 'wagmi'
import { mantleTestnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mantleTestnet],
  connectors: [
    injected(),
  ],
  transports: {
    [mantleTestnet.id]: http(),
  },
}) 
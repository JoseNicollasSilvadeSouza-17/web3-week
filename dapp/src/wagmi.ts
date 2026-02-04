import { createConfig, http } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'

export const config = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http()
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}

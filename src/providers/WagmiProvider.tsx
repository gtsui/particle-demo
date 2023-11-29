"use client";

import { useMemo } from "react";
import { configureChains, mainnet, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  connectorsForWallets,
  RainbowKitProvider,
  darkTheme,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { ParticleNetwork } from "@particle-network/auth";

import "@rainbow-me/rainbowkit/styles.css";

const WagmiProvider = ({ children }: { children: React.ReactNode }) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet],
    [publicProvider()]
  );

  const particle = new ParticleNetwork({
    projectId: "5cb4fb13-1396-4e8f-b524-9e062f81245d",
    clientKey: "c6qP1SPPdvxqI4EKLSJPpPJfj8RacOmVDZ0SFQYB",
    appId: "e808e5ef-caa5-4847-8dc6-7b416ecfaf42",
  });

  //const supportedWallets = useMemo(
  //  () => ({
  //    groupName: 'wallet',
  //    wallets: [
  //      particleWallet({ chains, authType: 'google' }),
  //      particleWallet({ chains, authType: 'facebook' }),
  //      particleWallet({ chains, authType: 'apple' }),
  //      particleWallet({ chains }),
  //      metaMaskWallet({ projectId: 'zima', chains }),
  //    ],
  //  }),
  //  [particle],
  //);

  const supportedWallets = {
    groupName: "wallet",
    wallets: [metaMaskWallet({ projectId: "zima", chains })],
  };

  const config = createConfig({
    autoConnect: true,
    connectors: connectorsForWallets([supportedWallets]),
    publicClient,
    webSocketPublicClient,
  });

  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>
        {children}
        <ConnectButton />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default WagmiProvider;

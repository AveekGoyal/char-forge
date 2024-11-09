import { cookieStorage, createStorage, http } from "@wagmi/core";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { mainnet, base } from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = "e6cea2becd1acf7ecb1959e5221ac558";

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [mainnet, base];

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;

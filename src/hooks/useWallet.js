import { create } from 'zustand';
import { ethers } from 'ethers';
import { ARC_CONFIG } from '../utils/arc-config';

const useWalletStore = create((set, get) => ({
  address: null,
  provider: null,
  signer: null,
  chainId: null,
  balance: '0',
  isConnected: false,
  isConnecting: false,
  
  connect: async () => {
    if (!window.ethereum) {
      throw new Error('No wallet detected. Please install MetaMask.');
    }

    set({ isConnecting: true });

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();
      const address = accounts[0];

      if (Number(network.chainId) !== ARC_CONFIG.chainId) {
        await get().switchToARC();
      }

      const balance = await provider.getBalance(address);

      set({
        address,
        provider,
        signer,
        chainId: Number(network.chainId),
        balance: ethers.formatUnits(balance, 6),
        isConnected: true,
        isConnecting: false,
      });

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          get().disconnect();
        } else {
          set({ address: accounts[0] });
        }
      });

      window.ethereum.on('chainChanged', (chainId) => {
        if (Number(chainId) !== ARC_CONFIG.chainId) {
          get().switchToARC();
        }
        set({ chainId: Number(chainId) });
      });
    } catch (error) {
      set({ isConnecting: false });
      throw error;
    }
  },

  disconnect: () => {
    set({
      address: null,
      provider: null,
      signer: null,
      chainId: null,
      balance: '0',
      isConnected: false,
    });
  },

  switchToARC: async () => {
    if (!window.ethereum) return;

    const hexChainId = '0x' + ARC_CONFIG.chainId.toString(16);

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: hexChainId,
            chainName: ARC_CONFIG.chainName,
            nativeCurrency: ARC_CONFIG.nativeCurrency,
            rpcUrls: ARC_CONFIG.rpcUrls,
            blockExplorerUrls: ARC_CONFIG.blockExplorerUrls,
          }],
        });
      }
    }
  },

  refreshBalance: async () => {
    const { provider, address } = get();
    if (!provider || !address) return;

    const balance = await provider.getBalance(address);
    set({ balance: ethers.formatUnits(balance, 6) });
  },
}));

export default useWalletStore;

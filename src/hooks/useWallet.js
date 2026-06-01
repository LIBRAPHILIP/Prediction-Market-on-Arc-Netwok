import { create } from 'zustand';
import { ethers } from 'ethers';
import { ARC_CONFIG, CONTRACT_ADDRESSES } from '../utils/arc-config';
import { USDC_ABI } from '../contracts/abis';

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

      // Read USDC (6 decimals) balance instead of native ETH balance
      const usdcContract = new ethers.Contract(CONTRACT_ADDRESSES.usdcToken, USDC_ABI, provider);
      let usdcBalance = '0';
      try {
        const bal = await usdcContract.balanceOf(address);
        usdcBalance = ethers.formatUnits(bal, ARC_CONFIG.nativeCurrency.decimals);
      } catch (e) {
        // Fallback to native balance if token call fails
        const nativeBal = await provider.getBalance(address);
        usdcBalance = ethers.formatUnits(nativeBal, ARC_CONFIG.nativeCurrency.decimals);
      }

      set({
        address,
        provider,
        signer,
        chainId: Number(network.chainId),
        balance: usdcBalance,
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

      window.ethereum.on('chainChanged', async (chainId) => {
        const numeric = Number(chainId);
        set({ chainId: numeric });
        if (numeric !== ARC_CONFIG.chainId) {
          // Prompt switch back to ARC Network
          try {
            await get().switchToARC();
          } catch (e) {
            console.warn('Failed to switch to ARC:', e);
          }
        } else {
          // If switched to ARC, refresh provider and balance
          try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            set({ provider });
            const usdcContract = new ethers.Contract(CONTRACT_ADDRESSES.usdcToken, USDC_ABI, provider);
            const bal = await usdcContract.balanceOf(get().address);
            set({ balance: ethers.formatUnits(bal, ARC_CONFIG.nativeCurrency.decimals) });
          } catch (e) {
            console.warn('Failed to refresh USDC balance after chain change', e);
          }
        }
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

    try {
      const usdcContract = new ethers.Contract(CONTRACT_ADDRESSES.usdcToken, USDC_ABI, provider);
      const bal = await usdcContract.balanceOf(address);
      set({ balance: ethers.formatUnits(bal, ARC_CONFIG.nativeCurrency.decimals) });
    } catch (e) {
      const nativeBal = await provider.getBalance(address);
      set({ balance: ethers.formatUnits(nativeBal, ARC_CONFIG.nativeCurrency.decimals) });
    }
  },
}));

export default useWalletStore;

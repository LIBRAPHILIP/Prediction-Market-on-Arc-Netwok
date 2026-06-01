// ARC Network Configuration (Testnet)
const ENV = typeof import.meta !== 'undefined' ? import.meta.env : process.env;

export const ARC_CONFIG = {
  chainId: ENV.VITE_CHAIN_ID ? Number(ENV.VITE_CHAIN_ID) : 5042002,
  chainName: ENV.VITE_CHAIN_NAME || 'ARC Network Testnet',
  nativeCurrency: {
    name: ENV.VITE_NATIVE_NAME || 'USD Coin',
    symbol: ENV.VITE_NATIVE_SYMBOL || 'USDC',
    decimals: ENV.VITE_NATIVE_DECIMALS ? Number(ENV.VITE_NATIVE_DECIMALS) : 6,
  },
  rpcUrls: [ENV.VITE_RPC_URL || 'http://rpc.testnet.arc.network'],
  blockExplorerUrls: [ENV.VITE_EXPLORER_URL || 'http://testnet.arcscan.app'],

  gasConfig: {
    baseFee: ENV.VITE_BASE_FEE || '1000000',
    priorityFee: ENV.VITE_PRIORITY_FEE || '500000',
    gasLimit: {
      trade: ENV.VITE_GAS_TRADE ? Number(ENV.VITE_GAS_TRADE) : 300000,
      createMarket: ENV.VITE_GAS_CREATE ? Number(ENV.VITE_GAS_CREATE) : 2000000,
      resolve: ENV.VITE_GAS_RESOLVE ? Number(ENV.VITE_GAS_RESOLVE) : 150000,
      deposit: ENV.VITE_GAS_DEPOSIT ? Number(ENV.VITE_GAS_DEPOSIT) : 200000,
    },
  },

  executionLayer: {
    evmCompatible: true,
    blockTime: ENV.VITE_BLOCK_TIME ? Number(ENV.VITE_BLOCK_TIME) : 2,
    finality: ENV.VITE_FINALITY ? Number(ENV.VITE_FINALITY) : 12,
  },
};

export const CONTRACT_ADDRESSES = {
  predictARC: ENV.VITE_PREDICT_ARC_ADDRESS || '0x1234567890abcdef1234567890abcdef12345678',
  marketFactory: ENV.VITE_MARKET_FACTORY_ADDRESS || '0x2345678901abcdef2345678901abcdef23456789',
  oracleRegistry: ENV.VITE_ORACLE_REGISTRY_ADDRESS || '0x3456789012abcdef3456789012abcdef34567890',
  usdcToken: ENV.VITE_USDC_ADDRESS || '0x4567890123abcdef4567890123abcdef45678901',
  cctpMessageTransmitter: ENV.VITE_CCTP_MESSAGE_TRANSMITTER || '0x5678901234abcdef5678901234abcdef56789012',
  cctpTokenMessenger: ENV.VITE_CCTP_TOKEN_MESSENGER || '0x6789012345abcdef6789012345abcdef67890123',
};

export const CCTP_CONFIG = {
  supportedChains: {
    ethereum: {
      chainId: 1,
      domainId: 0,
      tokenMessenger: '0xBd3fa81B58Ba92a82136038B25aDec7066af3155',
      messageTransmitter: '0x0a992d191DEeC32aFe36203Ad87D7d289a738F81',
      usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    },
    sepolia: {
      chainId: 11155111,
      domainId: 0,
      tokenMessenger: '0x9f3B8679c73C2Fef8b59B4f3444d4e156fb70AA5',
      messageTransmitter: '0x7865fAfC2db2093669d92c0F335A0A06C8F57815',
      usdc: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    }
  },
  arcDomainId: 9,
};

export const SUPPORTED_CHAINS_FOR_DISPLAY = [
  { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: '#627EEA' },
  { id: 'sepolia', name: 'Sepolia (Testnet)', icon: '⟠', color: '#9064FF' },
];

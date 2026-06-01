// ARC Network Configuration (Testnet)
export const ARC_CONFIG = {
  chainId: 5042002, // ARC Testnet Chain ID
  chainName: 'ARC Network Testnet',
  nativeCurrency: {
    name: 'USD Coin',
    symbol: 'USDC',
    decimals: 6,
  },
  rpcUrls: ['http://rpc.testnet.arc.network'],
  blockExplorerUrls: ['http://testnet.arcscan.app'],
  
  gasConfig: {
    baseFee: '1000000',
    priorityFee: '500000',
    gasLimit: {
      trade: 300000,
      createMarket: 2000000,
      resolve: 150000,
      deposit: 200000,
    },
  },

  executionLayer: {
    evmCompatible: true,
    blockTime: 2,
    finality: 12,
  },
};

export const CONTRACT_ADDRESSES = {
  predictARC: '0x1234567890abcdef1234567890abcdef12345678',
  marketFactory: '0x2345678901abcdef2345678901abcdef23456789',
  oracleRegistry: '0x3456789012abcdef3456789012abcdef34567890',
  usdcToken: '0x4567890123abcdef4567890123abcdef45678901',
  cctpMessageTransmitter: '0x5678901234abcdef5678901234abcdef56789012',
  cctpTokenMessenger: '0x6789012345abcdef6789012345abcdef67890123',
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

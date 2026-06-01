import { useState } from 'react';
import { ethers } from 'ethers';
import { CCTP_CONFIG, CONTRACT_ADDRESSES } from '../utils/arc-config';
import { USDC_ABI, CCTP_TOKEN_MESSENGER_ABI, CCTP_MESSAGE_TRANSMITTER_ABI } from '../contracts/abis';
import useWalletStore from './useWallet';

export const useCCTP = () => {
  const [isBridging, setIsBridging] = useState(false);
  const [bridgeStep, setBridgeStep] = useState('');
  const [txHash, setTxHash] = useState('');

  const bridgeUSDC = async (sourceChain, amount) => {
    const { address } = useWalletStore.getState();
    if (!address || !window.ethereum) throw new Error('Wallet not connected');

    setIsBridging(true);
    
    try {
      const chainConfig = CCTP_CONFIG.supportedChains[sourceChain];
      if (!chainConfig) throw new Error('Unsupported source chain');

      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainConfig.chainId.toString(16)}` }],
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const amountWei = ethers.parseUnits(amount.toString(), 6);

      setBridgeStep('Approving USDC...');
      const usdcContract = new ethers.Contract(chainConfig.usdc, USDC_ABI, signer);
      const approveTx = await usdcContract.approve(chainConfig.tokenMessenger, amountWei);
      await approveTx.wait();

      setBridgeStep('Burning USDC on source chain...');
      const tokenMessenger = new ethers.Contract(
        chainConfig.tokenMessenger,
        CCTP_TOKEN_MESSENGER_ABI,
        signer
      );

      const mintRecipient = ethers.zeroPadValue(address, 32);

      const burnTx = await tokenMessenger.depositForBurn(
        amountWei,
        CCTP_CONFIG.arcDomainId,
        mintRecipient,
        chainConfig.usdc
      );

      const burnReceipt = await burnTx.wait();
      setTxHash(burnReceipt.hash);

      setBridgeStep('Waiting for Circle attestation...');
      const messageHash = getMessageHashFromReceipt(burnReceipt);
      const attestation = await waitForAttestation(messageHash);

      setBridgeStep('Receiving USDC on ARC Network...');
      const { switchToARC } = useWalletStore.getState();
      await switchToARC();

      const arcProvider = new ethers.BrowserProvider(window.ethereum);
      const arcSigner = await arcProvider.getSigner();

      const messageTransmitter = new ethers.Contract(
        CONTRACT_ADDRESSES.cctpMessageTransmitter,
        CCTP_MESSAGE_TRANSMITTER_ABI,
        arcSigner
      );

      const receiveTx = await messageTransmitter.receiveMessage(
        attestation.message,
        attestation.attestation
      );

      await receiveTx.wait();
      setBridgeStep('Complete!');
      
      return { success: true, sourceTx: burnReceipt.hash, destTx: receiveTx.hash };
    } catch (error) {
      console.error('Bridge error:', error);
      throw error;
    } finally {
      setIsBridging(false);
      setBridgeStep('');
    }
  };

  const getMessageHashFromReceipt = (receipt) => {
    const messageSentTopic = ethers.id('MessageSent(bytes)');
    const log = receipt.logs.find(l => l.topics[0] === messageSentTopic);
    if (!log) throw new Error('MessageSent event not found');
    
    const abiCoder = ethers.AbiCoder.defaultAbiCoder();
    const [message] = abiCoder.decode(['bytes'], log.data);
    return ethers.keccak256(message);
  };

  const waitForAttestation = async (messageHash, maxAttempts = 60) => {
    const url = `https://iris-api.circle.com/attestations/${messageHash}`;
    
    for (let i = 0; i < maxAttempts; i++) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'complete') {
          return {
            message: data.message,
            attestation: data.attestation,
          };
        }
      } catch (e) {
        console.log('Attestation check attempt', i + 1);
      }
      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
    
    throw new Error('Attestation timeout - please check status manually');
  };

  return {
    bridgeUSDC,
    isBridging,
    bridgeStep,
    txHash,
  };
};

export default useCCTP;

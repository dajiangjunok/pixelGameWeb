import { createContext } from 'react'

export interface IPixelContractConfig {
  address: string
  abi: Array<any>
  onLogs: (logs: any) => void
}
export const pixelContractConfig: IPixelContractConfig = {
  address: '0x8C7B6A6F25C767588F1838bD08D798383C23CaFA',
  abi: [
    { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
    { inputs: [], name: 'PixelGame__NotEnoughETH', type: 'error' },
    { inputs: [], name: 'PixelGame__PixelAlreadyPurchased', type: 'error' },
    { inputs: [], name: 'PixelGame__PixelIndexOutOfBounds', type: 'error' },
    { inputs: [], name: 'PixelGame__TransferFailed', type: 'error' },
    { inputs: [], name: 'ReentrancyGuardReentrantCall', type: 'error' },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'player',
          type: 'address'
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'pixelIndex',
          type: 'uint256'
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'pixelColor',
          type: 'uint256'
        }
      ],
      name: 'PixelPurchased',
      type: 'event'
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'prevWinnerAddress',
          type: 'address'
        }
      ],
      name: 'PixelWinner',
      type: 'event'
    },
    {
      inputs: [],
      name: 'getPixelArray',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'player', type: 'address' },
            { internalType: 'uint256', name: 'pixelIndex', type: 'uint256' },
            { internalType: 'uint256', name: 'pixelColor', type: 'uint256' },
            { internalType: 'bool', name: 'isPurchased', type: 'bool' },
            { internalType: 'string', name: 'pixelImage', type: 'string' }
          ],
          internalType: 'struct PixelGame.Pixel[]',
          name: '',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'pixelIndex', type: 'uint256' }
      ],
      name: 'getPixelInfo',
      outputs: [
        {
          components: [
            { internalType: 'address', name: 'player', type: 'address' },
            { internalType: 'uint256', name: 'pixelIndex', type: 'uint256' },
            { internalType: 'uint256', name: 'pixelColor', type: 'uint256' },
            { internalType: 'bool', name: 'isPurchased', type: 'bool' },
            { internalType: 'string', name: 'pixelImage', type: 'string' }
          ],
          internalType: 'struct PixelGame.Pixel',
          name: '',
          type: 'tuple'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'getPrevWinnerAddress',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      name: 'pixelArray',
      outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
      name: 'pixelMapping',
      outputs: [
        { internalType: 'address', name: 'player', type: 'address' },
        { internalType: 'uint256', name: 'pixelIndex', type: 'uint256' },
        { internalType: 'uint256', name: 'pixelColor', type: 'uint256' },
        { internalType: 'bool', name: 'isPurchased', type: 'bool' },
        { internalType: 'string', name: 'pixelImage', type: 'string' }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'prevWinnerAddress',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'pixelIndex', type: 'uint256' },
        { internalType: 'uint256', name: 'pixelColor', type: 'uint256' },
        { internalType: 'string', name: 'pixelImage', type: 'string' }
      ],
      name: 'purchasePixel',
      outputs: [],
      stateMutability: 'payable',
      type: 'function'
    }
  ],
  onLogs(logs) {
    console.log('New logs!', logs)
  }
}

export const ContractContext = createContext<IPixelContractConfig>({
  address: '',
  abi: [],
  onLogs: () => {}
})

export const contractConfig = {
  address: pixelContractConfig.address as `0x${string}`,
  abi: pixelContractConfig.abi
} as const

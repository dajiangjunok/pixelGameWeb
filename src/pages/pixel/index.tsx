import { memo, useState } from 'react'
import {
  useWatchContractEvent,
  useBalance,
  useReadContract,
  usePublicClient
} from 'wagmi'
import { parseAbiItem } from 'viem' // 需要先导入这个工具函数

import { contractConfig } from '@/lib/context/ContractContext'
import Header from './components/Header.tsx'
import PixelContainer from './components/PixelContainer.tsx'
import Footer from './components/Footer.tsx'
import { IColorPexels } from './interface.ts'

const colorPexels = new Array(25).fill({
  imgUrl: '',
  color: '#ffffff',
  isActive: false
})

const Pixel = memo(() => {
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [colorPexelsList, setColorPexelsList] =
    useState<IColorPexels[]>(colorPexels)

  const result = useBalance({
    address: contractConfig.address
  })

  const { data: prevWinnerAddress, isPending } = useReadContract({
    ...contractConfig,
    functionName: 'prevWinnerAddress'
  })

  useWatchContractEvent({
    address: contractConfig.address,
    abi: contractConfig.abi,
    eventName: 'PixelPurchased',
    onLogs(logs) {
      console.log('PixelPurchased logs!', logs)
      result.refetch()
    }
  })

  useWatchContractEvent({
    address: contractConfig.address,
    abi: contractConfig.abi,
    eventName: 'PixelWinner',
    onLogs(logs) {
      console.log('PixelWinner logs!', logs)
      // alert(`winner: ${logs[0].args?.winner}`)
    }
  })

  // useWatchContractEvent({
  //   address: contractConfig.address,
  //   abi: contractConfig.abi,
  //   eventName: 'RequestedRaffleWinner',
  //   onLogs(logs) {
  //     console.log('RequestedRaffleWinner logs!', logs)

  //   }
  // })
  const publicClient: any = usePublicClient()
  async function searchLogs() {
    try {
      const currentBlock = await publicClient.getBlockNumber()
      // 只查询最近100个区块的日志
      const logs = await publicClient.getLogs({
        address: contractConfig.address,
        event: parseAbiItem(
          'event PixelPurchased(address indexed player, uint256 indexed pixelIndex, uint256 pixelColor)'
        ),
        fromBlock: currentBlock - BigInt(10), // 限制为100个区块
        toBlock: 'latest'
      })

      console.log('查询到的事件:', logs)

      // ... existing code ...
    } catch (error) {
      console.error('查询事件失败:', error)
    }
  }

  return (
    <div className="h-full w-full bg-gray-900 flex items-center justify-around">
      {/* 显示链上资金余额 */}
      <div className="absolute top-4 right-4 text-white">
        <div className="flex items-center gap-2">
          <span>合约余额:</span>
          <span>
            {' '}
            {result.data
              ? `  ${result.data.formatted} ${result.data.symbol}`
              : '加载中...'}{' '}
          </span>
        </div>
        <p className="text-xs pb-2 pt-2">
          上个中奖者:
          {isPending
            ? '...'
            : prevWinnerAddress
            ? `${prevWinnerAddress.slice(0, 4)}...${prevWinnerAddress.slice(
                -4
              )}`
            : '-'}
        </p>
        <p className="text-xs">当前参加游戏: 0.02 Mon</p>
      </div>
      <div className="h-160 w-100 bg-white rounded-lg">
        <Header />
        <PixelContainer
          selectedColor={selectedColor}
          colorPexelsList={colorPexelsList}
          setColorPexelsList={setColorPexelsList}
        />
        <Footer
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          colorPexelsList={colorPexelsList}
          setColorPexelsList={setColorPexelsList}
        />
      </div>

      <button
        onClick={() => searchLogs()}
        className="absolute bottom-4 right-4 px-2 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
      >
        查询日志
      </button>
    </div>
  )
})

export default Pixel

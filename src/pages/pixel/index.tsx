import React, { memo, useState } from 'react'
import { useWatchContractEvent } from 'wagmi'
import { contractConfig } from '@/lib/context/ContractContext'
import Header from './components/Header.tsx'
import PixelContainer from './components/PixelContainer.tsx'
import Footer from './components/Footer.tsx'
import { IColorPexels } from './interface.ts'

const colorPexels = new Array(25).fill({
  color: '#ffffff',
  isActive: false
})

const Pixel = memo(() => {
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [colorPexelsList, setColorPexelsList] =
    useState<IColorPexels[]>(colorPexels)

  useWatchContractEvent({
    address: contractConfig.address,
    abi: contractConfig.abi,
    eventName: 'PixelPurchased',
    onLogs(logs) {
      console.log('PixelPurchased logs!', logs)
    }
  })

  useWatchContractEvent({
    address: contractConfig.address,
    abi: contractConfig.abi,
    eventName: 'RequestFulfilled',
    onLogs(logs) {
      console.log('RequestFulfilled logs!', logs)
    }
  })

  useWatchContractEvent({
    address: contractConfig.address,
    abi: contractConfig.abi,
    eventName: 'RequestedRaffleWinner',
    onLogs(logs) {
      console.log('RequestedRaffleWinner logs!', logs)
    }
  })

  return (
    <div className="h-full w-full bg-gray-900 flex items-center justify-around">
      <div className="h-150 w-100 bg-white rounded-lg">
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
    </div>
  )
})

export default Pixel

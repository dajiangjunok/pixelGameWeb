import React, { memo, useState, useEffect } from 'react'
import { contractConfig } from '@/lib/context/ContractContext'
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract
} from 'wagmi'
import { IColorPexels } from '../interface.ts'

interface IFooterProps {
  selectedColor: string
  setSelectedColor: (color: string) => void
  colorPexelsList: IColorPexels[]
  setColorPexelsList: React.Dispatch<React.SetStateAction<IColorPexels[]>>
}

const Footer = memo(
  ({
    selectedColor,
    setSelectedColor,
    colorPexelsList,
    setColorPexelsList
  }: IFooterProps) => {
    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedColor(e.target.value)
    }
    const { data: hash, isPending, writeContract } = useWriteContract()
    const { isLoading: isConfirming, isSuccess: isConfirmed } =
      useWaitForTransactionReceipt({
        hash
      })
    const { data: pixels, refetch } = useReadContract({
      ...contractConfig,
      functionName: 'getPixelArray'
    })
    ////////////
    // effect //
    ////////////
    useEffect(() => {
      if (isConfirmed) {
        // 重新获取像素信息
        refetch().then(res => {
          if (res.data) {
            const updatedPixels = res.data.map(
              (pixel: number, index: number) => ({
                color: pixel
                  ? `#${pixel.toString(16).padStart(6, '0')}`
                  : '#ffffff',
                isActive: colorPexelsList[index].isActive
              })
            )
            setColorPexelsList(updatedPixels)
          }
        })
      }
    }, [isConfirmed])

    function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
      e.preventDefault()
      const currentPixel = colorPexelsList.find(
        (item: IColorPexels) => item.isActive
      )
      if (currentPixel) {
        // 获取当前选中像素的索引
        const pixelIndex = colorPexelsList.findIndex(item => item.isActive)
        // 将颜色转换为数字格式（去掉#前缀并转为十六进制数值）
        const pixelColor = parseInt(selectedColor.replace('#', ''), 16)
        console.log(pixelIndex, pixelColor)

        writeContract({
          ...contractConfig,
          functionName: 'purchasePixel',
          args: [BigInt(pixelIndex), BigInt(pixelColor)],
          // 添加value参数传递以太币，这里设置为0.002 ETH
          value: BigInt(0.002 * 1e18) // 0.002 ETH in wei
        })
      } else {
        alert('请先选择一个像素框')
      }
    }

    return (
      <div className="mt-15 w-[350px] mx-auto bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={selectedColor}
              onChange={handleColorChange}
              className="w-12 h-12 cursor-pointer rounded"
            />
            <span className="text-gray-600 font-mono">{selectedColor}</span>
          </div>
          <button
            disabled={isPending}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={e => handleSubmit(e)}
          >
            {isPending ? '确认中...' : '确认'}
          </button>
        </div>
        <div className="pt-2 text-xs flex items-center justify-between">
          {hash && (
            <div>
              交易哈希:
              <span title={hash}>{hash.substring(0, 8)}</span>
            </div>
          )}
          {isConfirming && <div>等待确认...</div>}
          {isConfirmed && <div>交易已确认</div>}
        </div>
      </div>
    )
  }
)

export default Footer

import React, { memo, useState, useContext, useEffect } from 'react'
import { useReadContract } from 'wagmi'
import { contractConfig } from '@/lib/context/ContractContext'
import { IColorPexels } from '../interface.ts'

interface IPixelContainerProps {
  selectedColor: string
  colorPexelsList: IColorPexels[]
  setColorPexelsList: React.Dispatch<React.SetStateAction<IColorPexels[]>>
}

const PixelContainer = memo(
  ({
    selectedColor,
    colorPexelsList,
    setColorPexelsList
  }: IPixelContainerProps) => {
    const { data: pixels, isPending } = useReadContract({
      ...contractConfig,
      functionName: 'getPixelArray'
    })

    ////////////
    // effect //
    ////////////
    useEffect(() => {
      if (pixels && !isPending) {
        // 假设 pixels 返回的是一个数组，包含每个像素的颜色信息
        const updatedPixels = pixels.map((pixel: number, index: number) => ({
          color: pixel ? `#${pixel.toString(16).padStart(6, '0')}` : '#ffffff',
          isActive: colorPexelsList[index].isActive
        }))
        setColorPexelsList(updatedPixels)
      }
    }, [pixels, isPending])

    function handlePixel(index: number) {
      const colorPexelsListMap = colorPexelsList.map(
        (iten: IColorPexels, i: number) => {
          if (i !== index) {
            return {
              ...iten,
              isActive: false
            }
          } else {
            return {
              ...iten,
              isActive: !iten.isActive
            }
          }
        }
      )
      setColorPexelsList(colorPexelsListMap)
    }

    return (
      <div className="pt-4 w-[350px] h-[350px] mx-auto">
        {isPending ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-5 gap-0 border border-gray-200">
            {colorPexelsList.map((item, index) => (
              <div
                key={index}
                className={`w-[70px] h-[70px] border border-gray-200 cursor-pointer hover:opacity-75 transition-all duration-200 ${
                  item.isActive ? 'scale-105 shadow-lg z-10 border-[3px]' : ''
                }`}
                style={{
                  backgroundColor: item.color,
                  borderColor: item.isActive ? selectedColor : ''
                }}
                onClick={() => handlePixel(index)}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)

export default PixelContainer

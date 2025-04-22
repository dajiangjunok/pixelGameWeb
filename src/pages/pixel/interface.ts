export interface IColorPexels {
  imgUrl: string
  color: string
  isActive: boolean
}

export interface IPixelContainerProps {
  selectedColor: string
  colorPexelsList: IColorPexels[]
  setColorPexelsList: React.Dispatch<React.SetStateAction<IColorPexels[]>>
}

export interface IPixel {
  player: string
  pixelIndex: number
  pixelColor: number
  isPurchased: boolean
  pixelImage: string
}

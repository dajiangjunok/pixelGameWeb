import { memo } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import autherImg from '@/assets/auther.png'

const Header = memo(() => {
  return (
    <div className="p-[4px]">
      <div className="title flex justify-between  items-center">
        <div className="left flex items-center  ">
          <img
            src={autherImg}
            alt=""
            className="border border-indigo-500 p-[4px] w-14 h-14 rounded-[50%]"
          />
          <div className="ps-1 flex flex-col ">
            <h3 className="text-lg">像素格子</h3>
            <span className="text-xs text-gray-400">
              当所有格子填满后随机抽取一个格子获取链上全部奖励
            </span>
          </div>
        </div>
        <div className="right">
          <ConnectButton
            label="连接钱包"
            accountStatus="avatar"
            showBalance={{ smallScreen: true }}
            chainStatus={{ smallScreen: 'icon' }}
          />
        </div>
      </div>
    </div>
  )
})

export default Header

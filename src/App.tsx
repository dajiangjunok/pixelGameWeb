import Pixel from '@/pages/pixel'
import { useAccountEffect } from 'wagmi'

function App() {
  useAccountEffect({
    onConnect(data) {
      console.log('Connected!', data)
    },
    onDisconnect() {
      console.log('Disconnected!')
    }
  })

  return (
    <div className="h-screen w-screen">
      <Pixel />
    </div>
  )
}

export default App

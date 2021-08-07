import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import LoginDialog from '../components/Dialogs/BaseDialog'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-background flex-1">
      <Navbar />
      <Component {...pageProps} />
      <LoginDialog />
    </div>
  )
}
export default MyApp

import '../styles/globals.css'
import App from 'next/app'
import 'antd/dist/antd.css'
import '../styles/pages/common.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp

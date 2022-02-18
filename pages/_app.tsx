import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppWrapper } from "../context/AppContext";
import { Loader } from '../utils/Loader';

function MyApp({ Component, pageProps }: AppProps) {
  return( 
  <AppWrapper>
    <Loader>
    <Component {...pageProps} />
    </Loader>
  </AppWrapper>
  )
}

export default MyApp

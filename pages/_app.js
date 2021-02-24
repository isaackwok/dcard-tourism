import '../styles/globals.css'
import NavBar from '../components/NavBar'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tourism</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <div className='main'>
        <Component {...pageProps} />
        <div className='backToTop'><a href='#'>&#10514;</a></div>
      </div>
    </>
  )
}

export default MyApp

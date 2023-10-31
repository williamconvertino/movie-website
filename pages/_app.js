import '@styles/globals.css';
import '@styles/styles.css';

import GlobalPageWrapper from '@components/global/GlobalPageWrapper';

function Application({ Component, pageProps }) {
  return ( 
    <GlobalPageWrapper>
      <Component {...pageProps} />
    </GlobalPageWrapper>
  )
}

export default Application
import '../styles/globals.css';

import { AppProps } from 'next/dist/shared/lib/router/router';
import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

const GTM_CONTAINER_ID = 'GTM-MNR86CN';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    TagManager.initialize({ gtmId: GTM_CONTAINER_ID });
  }, []);
  return <Component {...pageProps} />;
};

export default MyApp;

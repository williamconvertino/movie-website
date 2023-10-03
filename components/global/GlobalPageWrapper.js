import Head from 'next/head';

import { AuthContextProvider } from '@components/context/AuthContext';

export default function GlobalPageWrapper({children}) {
    return (
        <AuthContextProvider>
            <Head>
                <title>316 Website</title>
                {/* <link rel="icon" href="/favicon.ico" type="image/x-icon" /> */}
            </Head>
            {children}
        </AuthContextProvider>
        
    )
}
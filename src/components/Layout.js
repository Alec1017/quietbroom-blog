import React from 'react'
import { Link } from 'gatsby'
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { publicProvider } from 'wagmi/providers/public'

import { WalletConnect } from './WalletConnect'

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet],
  [publicProvider()],
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  provider,
  webSocketProvider,
})

function Layout(props) {
  const { location, title, children } = props;
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <h1 className='layout__header--large'>
        <Link className='layout__link--large' to={'/'}>
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3 className='layout__header--small'>
        <Link className='layout__link--small' to={'/'}>
          {title}
        </Link>
      </h3>
    )
  }

  return (
    <WagmiConfig client={client}>
      <WalletConnect />
      <div className='layout'>
        {header}
        {children}
      </div>
    </WagmiConfig>
  );
}

export default Layout;

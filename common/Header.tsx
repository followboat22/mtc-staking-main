import { AccountConnect } from '@cardinal/namespaces-components'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import { GlyphWallet } from 'assets/GlyphWallet'
import { useStakePoolId } from 'hooks/useStakePoolId'
import { useStakePoolMetadata } from 'hooks/useStakePoolMetadata'
import { useRouter } from 'next/router'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'


import { ButtonSmall } from './ButtonSmall'
import { contrastColorMode } from './utils'
import { asWallet } from './Wallets'

export const Header = () => {
  const router = useRouter()
  const { environment, secondaryConnection } = useEnvironmentCtx()
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const stakePoolId = useStakePoolId()
  const { data: stakePoolMetadata } = useStakePoolMetadata()

  return (
    <div>
      <div className={`mb-5 flex flex-wrap justify-between gap-6 px-5 pt-5 text-white`}
        style={{ color: stakePoolMetadata?.colors?.fontColor }}>
        <div className="flex items-center gap-3">      
              <div className="flex items-center justify-center gap-2 text-white">
                <img
                    alt={'/logo.png'}
                    className="inline-block w-10"
                    src={'/logo.png'}
                />
                <h1>MTC SHOP STAKING</h1>
              </div>
        </div>
        <div className="relative my-auto flex flex-wrap items-center gap-y-6 align-middle">
          <div className="mr-10 flex flex-wrap items-center justify-center gap-8">
            {stakePoolId && stakePoolMetadata ? (
              stakePoolMetadata.links?.map((link) => (
                <a
                  key={link.value}
                  href={link.value}
                  className="cursor-pointer transition-all hover:opacity-80"
                >
                  <p style={{ color: stakePoolMetadata?.colors?.fontColor }}>
                    {link.text}
                  </p>
                </a>
              ))
            ) : (
              <>
                <div
                  onClick={() =>
                    router.push(
                      `/admin${
                        environment.label !== 'mainnet-beta'
                          ? `?cluster=${environment.label}`
                          : ''
                      }`
                    )
                  }
                >
                  <p className="my-auto mr-10 hover:cursor-pointer">Admin</p>
                </div>
              </>
            )}
          </div>
          {wallet.connected && wallet.publicKey ? (
            <AccountConnect
              dark={
                stakePoolMetadata?.colors?.backgroundSecondary
                  ? contrastColorMode(stakePoolMetadata?.colors?.primary)[1]
                  : true
              }
              connection={secondaryConnection}
              environment={environment.label}
              handleDisconnect={() => wallet.disconnect()}
              wallet={asWallet(wallet)}
            />
          ) : (
            <ButtonSmall
              className="text-xs"
              onClick={() => walletModal.setVisible(true)}
            >
              <>
                <GlyphWallet />
                <div className="text-white">Connect wallet</div>
              </>
            </ButtonSmall>
          )}
        </div>
      </div>
    </div>
  )
}

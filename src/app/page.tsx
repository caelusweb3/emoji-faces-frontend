'use client'

import {config} from "../wagmi";
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { writeContract } from '@wagmi/core'

import NFTAbi from "../abis/NFT.json";

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()

  const contractAddress = "0xDD31AEecf3E92f9EFbc10A982AFC198D83Eb7093";

    console.log("account",account)
  const mintNFT = async () => {

    try{
      const result = await writeContract(config, {
        abi: NFTAbi,
        address: contractAddress,
        functionName: 'safeMint',
        args: [
          account.address
        ],
      })

      alert("NFT Minted")
    }
    catch(e){
      console.log(e)
      alert("Error minting NFT")
    }
 
  }

  return (
    <>
      <div className='flex items-center justify-center min-h-screen '>
        <div className='text-center bg-white p-8 rounded-lg'>
          <h1 className='text-2xl font-bold my-4'>Mint Your Emoji Face NFT</h1>

          <div className='mb-2'>
            <img src='/preview.gif'  className='mx-auto w-40'/>

          </div>

          {
            account.status === "connected" ? (

              <>
            <button className="text-white bg-blue-500 rounded-md hover:bg-blue-700 px-4 py-2 mt-2 mx-2" onClick={mintNFT}>
              Mint NFT
            </button>

            <button className="text-white bg-blue-500 rounded-md hover:bg-blue-700 px-4 py-2 mt-2 mx-2" onClick={() => disconnect()} >
              Disconnect
            </button>

            </>
            ) 
            :(
            <button className="text-white bg-blue-500 rounded-md hover:bg-blue-700 px-4 py-2 mt-2" onClick={() => connect({ connector: injected() })} >
              Connect Wallet
            </button>
            )
          }


        </div>
      </div>      
    </>
  )
}

export default App

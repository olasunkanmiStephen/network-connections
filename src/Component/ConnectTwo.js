import { ethers } from 'ethers';
import React, { useState } from 'react'

const ConnectTwo = () => {
    const [myAddress, setMyAddress] = useState(null);
    const [myAccountBalance, setMyAddressAccountBalance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // address of the account on the device
    const changedAddress = (contractAddress) => {
        setMyAddress(contractAddress)
        getMyAccountBalance(contractAddress)
    }
    

    const handleWalletConnection = () => {
        // to check for ethereum network on a device
        if (window.ethereum){
            // request for user action to sign install a network
            window.ethereum.request({ method: "eth_requestAccounts" }).then(result => {
                // respond the requested data
                changedAddress([result[0]])
            })
        } else {
            setErrorMessage();
        }
    }


    // function to get my accountBalance 
    const getMyAccountBalance = (contractAddress) => {
        window.ethereum.request({ method: "eth_getBalance", params: [String(contractAddress), "latest"] }).then(balance => {
            setMyAddressAccountBalance(ethers.formatEther(balance))
            
        })
    }


  return (
    <div>
      <input type='button' onClick={handleWalletConnection} value="Connect to Metamask" />
      <h4>My Contract Address: {myAddress}</h4>
      <h1>My Balance: ${myAccountBalance}</h1>
      {errorMessage}
    </div>
  )
}

export default ConnectTwo

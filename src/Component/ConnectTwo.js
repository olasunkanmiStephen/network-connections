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

    async function makeTransfer() {
        let params = [{
            from: "0xB092d3Fe8b74d46D9Fa311903d4836Fe92762BB0",
            to: "0x9d9bEA3C852BE30c4738C9fFcB18622fE8a2e5FF",
            gas: Number(50000).toString(16),
            gasPrice: Number(25000000).toString(16),
            value: Number(100000000000000).toString(16),
        }]

        let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <div>
      <input type='button' onClick={handleWalletConnection} value="Connect to Metamask" />
      <h4>My Contract Address: {myAddress}</h4>
      <h1>My Balance: ${myAccountBalance}</h1>

      <form onSubmit={makeTransfer}>
        <input type='submit' value='Send'/>
      </form>
      {errorMessage}
    </div>
  )
}

export default ConnectTwo

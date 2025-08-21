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
                changedAddress(result[0])
            })
        } else {
            setErrorMessage("Please install MetaMask")
        }
    }


    // function to get my accountBalance 
    const getMyAccountBalance = (contractAddress) => {
        window.ethereum.request({ method: "eth_getBalance", params: [String(contractAddress), "latest"] }).then(balance => {
            setMyAddressAccountBalance(ethers.formatEther(balance))
            
        })
    }

    async function makeTransfer(e) {
        e.preventDefault();
        if(!myAddress) return setErrorMessage("Connect Your Wallet")
        const params = {
            from: myAddress,
            to: e.target.to_address.value,
            gas: "0x5208",
            gasPrice: "0x2540be400",
            value: ethers.parseEther("0.01").toString(16),
        };

        let result = await window.ethereum.request({ method: "eth_sendTransaction", params: [params] }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <div>
      <input type='button' onClick={handleWalletConnection} value="Connect to Metamask" />
      <h4>My Contract Address: {myAddress}</h4>
      <h1>My Balance: ${myAccountBalance}</h1>

      <form onSubmit={makeTransfer}>
        <input type="text" name="to_address" placeholder="Receiver Address" required />
        <input type='submit' value='Send'/>
      </form>
      {errorMessage}
    </div>
  )
}

export default ConnectTwo
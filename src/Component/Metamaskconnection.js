import { ethers } from 'ethers';
import { useState } from 'react'

const Metamaskconnection = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setSetDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const handleconn = () => {
        if(window.ethereum){
            // req account from user
            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(result => {
                accountChanged([result[0]])
            })
        }
    }


    const accountChanged = (accountName) => {
        setSetDefaultAccount(accountName)
        getUserBalance(accountName)
    }

    const getUserBalance = (accountAddress) => {
        window.ethereum.request({ method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
        .then(balance => {
            setUserBalance(ethers.formatEther(balance));
        })
    }
  return (
    <div>
      <input type='button' onClick={handleconn} value="Connect to Metamask"/>
      <h3>My Address: {defaultAccount}</h3>
      <h3>My Balance: ${userBalance}</h3>
      <p>{errorMessage}</p>
    </div>
  )
}

export default Metamaskconnection

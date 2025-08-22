import { ethers } from 'ethers';

const ConnectTwo = ({ myAddress, setMyAddress,setErrorMessage, setMyAddressAccountBalance, children }) => {

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

    async function makeTransfer(priceEth) {
        if(!myAddress) return setErrorMessage("Connect Your Wallet")
        const params = {
            from: myAddress,
            to: "0x9d9bEA3C852BE30c4738C9fFcB18622fE8a2e5FF",
            gas: "0x5208",
            gasPrice: "0x2540be400",
            value: ethers.parseEther(priceEth.toString()).toString(16),
        };

        await window.ethereum.request({ method: "eth_sendTransaction", params: [params] }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <div>
      <input type='button' onClick={handleWalletConnection} value="Connect to Wallet" />
      {children && children({ makeTransfer })}
    </div>
  )
}

export default ConnectTwo
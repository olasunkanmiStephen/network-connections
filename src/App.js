import NavigationBar from './Component/Navbar'
import Carousels from './Component/Carousel'
import Cards from './Component/Cards'
import { useState } from 'react'


const App = () => {
  const [myAddress, setMyAddress] = useState("");
  const [myAccountBalance, setMyAddressAccountBalance] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div>
      <NavigationBar 
       myAddress={myAddress}
       myAccountBalance={myAccountBalance}
       setErrorMessage={setErrorMessage}
       setMyAddressAccountBalance={setMyAddressAccountBalance}
       setMyAddress={setMyAddress}
      />
      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}
      <Carousels />
      <Cards myAddress={myAddress} setErrorMessage={setErrorMessage}/>
    </div>
  )
}


export default App

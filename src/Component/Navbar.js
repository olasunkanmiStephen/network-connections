import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ConnectTwo from './ConnectTwo';

function NavigationBar({ myAddress, myAccountBalance, setMyAddress, setMyAddressAccountBalance, setErrorMessage }) {

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {myAddress ? (
            <>
                <span className='me-3'>
                    Addr: {myAddress.slice(0, 5)}...{myAddress.slice(-4)}
                </span>
                <span>
                    Bal: {Number(myAccountBalance).toFixed(4)} ETH
                </span>
            </>
        ): (
            "not Connected"
        )}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <ConnectTwo 
            myAddress={myAddress}
            setMyAddress={setMyAddress}
            setMyAddressAccountBalance={setMyAddressAccountBalance}
            setErrorMessage={setErrorMessage}/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
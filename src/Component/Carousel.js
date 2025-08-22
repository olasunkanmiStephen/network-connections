import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouseItems';
import Image3 from '../images/security.jpeg'
import Image2 from '../images/global.jpeg'
import Image1 from '../images/blockchains.jpeg'
import Image4 from '../images/transparency.jpeg'

function Carousels() {
  return (
    <Carousel>
      <Carousel.Item>
        <CarouselImage src={Image3} />
        <Carousel.Caption>
          <h3>Decentralization</h3>
          <p>Decentralization removes the need for intermediaries, allowing dApps to run peer-to-peer. This increases resilience against single points of failure and gives users more control over their data and assets.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage src={Image2} />
        <Carousel.Caption>
          <h3>Global Accessibility</h3>
          <p>
            DApps on blockchain are borderless, enabling anyone with an internet connection to access services, financial tools, and marketplaces without geographic restrictions.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage src={Image1} />
        <Carousel.Caption>
          <h3>Ownership & Control</h3>
          <p>
            Users maintain true ownership of their digital assets within dApps. Smart contracts allow them to control funds, identities, and tokens without intermediaries.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage src={Image4} />
        <Carousel.Caption>
          <h3>Transparency & Trust</h3>
          <p>
            Blockchain ensures transparency by keeping all transactions visible and verifiable on a public ledger. For dApps, this fosters trust among users without relying on centralized authorities.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
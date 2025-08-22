import PropTypes from "prop-types"
import '../App.css'

function CarouselImage({src, alt, text}) {
  return (
    <img className='carousel-image' src={src} alt={alt || text}/>
  )
}

CarouselImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    text: PropTypes.string
}

export default CarouselImage;
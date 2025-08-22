import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Loading from "../utils/Loading";
import "../App.css";
import { ethers } from "ethers";


function Cards({ myAddress, setErrorMessage }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 6;

  useEffect(() => {
    axios
      .get("https://api.escuelajs.co/api/v1/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handlePurchase = async (priceEth) => {
    if (!myAddress) return setErrorMessage("Connect Your Wallet");
    const params = {
      from: myAddress,
      to: "0x9d9bEA3C852BE30c4738C9fFcB18622fE8a2e5FF",
      gas: "0x5208",
      gasPrice: "0x2540be400",
      value: ethers.parseEther(priceEth.toString()).toString(16),
    };

    await window.ethereum
      .request({ method: "eth_sendTransaction", params: [params] })
      .catch((err) => {
        console.log(err);
      });
  };

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="p-6">
        <div className="product-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={
                  Array.isArray(product.images)
                    ? product.images[0]
                    : product.images
                }
                alt={product.title}
                className="h-40 object-contain mb-4"
              />

              <div className="bdy">
                <h3>{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <h2>${product.price}</h2>
                <Button
                  variant="primary"
                  onClick={() => handlePurchase(product.price)}
                >
                  Purchase
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Button
          variant="secondary"
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="me-2"
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="ms-2"
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default Cards;

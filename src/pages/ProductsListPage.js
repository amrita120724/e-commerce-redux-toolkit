import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import SearchBar from "../components/Searchbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { listProducts } from "../actions/productActions";
import { getProducts } from "../features/products/productsSlice";
import AlertMessage from "../components/AlertMessage";
import Spinner from "react-bootstrap/Spinner";
import { Navigate } from "react-router-dom";

const ProductsListPage = () => {
  const [productsList, setProductsList] = useState();
  const [searchbarValue, setSearchbarValue] = useState("");

  const dispatch = useDispatch();

  const listOfProducts = useSelector((state) => state.products);
  const { loading, success, error, products } = listOfProducts;
  console.log(loading, success, error, products);

  useEffect(() => {
    dispatch(getProducts());
    if (products && products.length > 0) {
      console.log(products);
      setProductsList(products);
    }
  }, []);

  useEffect(() => {
    if (products && products.length > 0) {
      console.log(products);
      setProductsList(products);
    }
  }, [success]);

  const searchProducts = (event) => {
    event.preventDefault();
    setSearchbarValue(event.target.value);
    console.log(searchbarValue);

    let productsListFiltered = products.filter((product) => {
      if (product.title.toLowerCase().includes(searchbarValue.toLowerCase())) {
        return true;
      }
      return false;
    });

    console.log(productsListFiltered);

    setProductsList(productsListFiltered);

    if (searchbarValue === "") {
      setProductsList(products);
    }
  };

  return (
    <>
      {productsList && productsList.length > 0 && (
        <SearchBar
          handler={setSearchbarValue}
          searchBarValue={searchbarValue}
          searchProductsFunction={searchProducts}
        />
      )}
      {loading && <Spinner animation="grow" />}
      {productsList && productsList.length === 0 && (
        <AlertMessage variant="info" message="No products to display" />
      )}
      {productsList && (
        <Row>
          {productsList.map((product) => (
            <Col key={product.id} md={6} sm={12} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default ProductsListPage;

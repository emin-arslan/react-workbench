import CategoryList from "./CategoryList";
import React, { Component } from "react";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";

export default class App extends Component {
  state = { currentCategory: "", products: [] , cart:[]};
  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (seoUrl) => {
    let url = "http://localhost:3000/comments";
    if (seoUrl) {
      url += "?id=" + seoUrl;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };
  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find(c=>c.product.id === product.id)
    if(addedItem){
      addedItem.quantity +=1;
    }
    else{
      newCart.push({product:product,quantity:1});
    }
    this.setState({cart:newCart});
  };
  render() {
    let productInfo = { title: "ProductList" };
    let CetegoryInfo = { title: "CategoryList" };
    return (
      <div>
        <Container>
          <Navi cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={CetegoryInfo}
              />
            </Col>
            <Col xs="9">
              <ProductList addToCart = {this.addToCart} info={productInfo} products={this.state.products} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

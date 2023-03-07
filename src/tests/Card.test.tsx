import React from "react";
import { render, screen } from "@testing-library/react";
import { Card } from "../components/Card/Card";
import { TestProviders } from "./testUtils";

describe("Testes for Card Component", () => {
  it("Should render image title description price wishlist-button and add to cart button when all props are passed", () => {
    render(
      <Card
        item={{
          id: 26,
          title: "Test Title",
          description: "Test Description",
          image: "Test Image URL",
          price: 20,
          wishlisted: false,
          count: 2,
        }}
        deleteProduct={() => {}}
        addToCart={() => {}}
        toggleWishlist={() => {}}
      />,
      { wrapper: TestProviders }
    );

    const productImage = screen.getByAltText("product visual");
    expect(productImage).toBeInTheDocument();

    const productTitle = screen.getByText(/Test Title/i);
    expect(productTitle).toBeInTheDocument();

    const productDescription = screen.getByText(/Test Description/i);
    expect(productDescription).toBeInTheDocument();
    
    const productPrice = screen.getByText(/20/i);
    expect(productPrice).toBeInTheDocument();

    const wishlistButton = screen.getByText(/Add to WishList/i)
    expect(wishlistButton).toBeInTheDocument()

    const addToCartButton = screen.getByText(/Add to cart/i)
    expect(addToCartButton).toBeInTheDocument()

  });

  it("Should render image title description total-price and quantity when addToCart toggleWishlist props are not passed", () => {
    render(
      <Card
        item={{
          id: 26,
          title: "Test Title",
          description: "Test Description",
          image: "Test Image URL",
          price: 20,
          wishlisted: false,
          count: 2,
        }}
        deleteProduct={() => {}}
      />,
      { wrapper: TestProviders }
    );

    const productImage = screen.getByAltText("product visual");
    expect(productImage).toBeInTheDocument();

    const productTitle = screen.getByText(/Test Title/i);
    expect(productTitle).toBeInTheDocument();

    const productDescription = screen.getByText(/Test Description/i);
    expect(productDescription).toBeInTheDocument();
    
    const productPrice = screen.getByText(/40/i);
    expect(productPrice).toBeInTheDocument();
    
    const productQuantity = screen.getByText(/Quantity :2/i);
    expect(productQuantity).toBeInTheDocument();

  });

  it("should change the text of wishlist button when wishlisted is true",async () => {
    
    render(
      <Card
        item={{
          id: 26,
          title: "Test Title",
          description: "Test Description",
          image: "Test Image URL",
          price: 20,
          wishlisted: true,
          count: 2,
        }}
        deleteProduct={() => {}}
        addToCart={() => {}}
        toggleWishlist={() => {}}
      />,
      { wrapper: TestProviders }
    );

    const newWishlistButtonText = screen.getByText(/WishListed/i)
    expect(newWishlistButtonText).toBeInTheDocument()

  }
  )

});

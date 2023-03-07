import React from "react";
import { act, render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar/NavBar";
import { TestProviders } from "./testUtils";

describe("NavBar test cases", () => {
  it("should render NavBar with title 'Shopping Cart'", () => {
    render(<NavBar />, { wrapper: TestProviders });

    const title = screen.getByText("Shopping Cart");
    expect(title).toBeInTheDocument();
  });

  it("should render 4 Links", () => {
    render(<NavBar />, { wrapper: TestProviders });

    const links = screen.getAllByRole("listitem");
    expect(links).toHaveLength(4);
  });

  it("should render links in order 'Home Admin Shop Cart'", () => {
    render(<NavBar />, { wrapper: TestProviders });

    const expectedLinkSequence = ["Home", "Admin", "Shop", "Cart"];
    const links = screen.getAllByRole("listitem");
    const linkLabels = links.map((link) => link.textContent);
    expect(linkLabels).toMatchObject(expectedLinkSequence);
  });

  it("Should correct href links as per the Link labels", () => {
    render(<NavBar />, { wrapper: TestProviders });

    const links: HTMLAnchorElement[] = screen.getAllByRole("link");

    expect(links[0].textContent).toMatch("Home");
    expect(links[0].href).toMatch("http://localhost/");

    expect(links[1].textContent).toMatch("Admin");
    expect(links[1].href).toMatch("http://localhost/admin");

    expect(links[2].textContent).toMatch("Shop");
    expect(links[2].href).toMatch("http://localhost/shop");

    expect(links[3].textContent).toMatch("Cart");
    expect(links[3].href).toMatch("http://localhost/cart");
  });

  it("should render the toggle delete Label and checkbox", () => {
    render(<NavBar />, { wrapper: TestProviders });

    const deleteLabel = screen.getByText("Delete");
    expect(deleteLabel).toBeInTheDocument();

    const deleteCheckbox = screen.getByRole("checkbox");
    expect(deleteCheckbox).toBeInTheDocument();
  });

  it("should toggle delete when clicked on checkbox", () => {
    render(<NavBar />, { wrapper: TestProviders });

    const deleteCheckbox: HTMLInputElement = screen.getByRole("checkbox");
    const checkboxValue = deleteCheckbox.checked;

    act(() => deleteCheckbox.click());

    expect(checkboxValue).toBe(!deleteCheckbox.checked);
  });
});

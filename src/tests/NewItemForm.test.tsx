import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { NewItemForm } from '../components/NewItemForm/NewItemForm';
import { TestProviders } from "./testUtils";

describe("Test cases for New Item form",()=>{
  it("should render all fields, input elements and buttons for them",()=>{
    render(<NewItemForm/>,{wrapper:TestProviders})

    const title = screen.getByText(/Title/i)
    expect(title).toBeInTheDocument()

    const description = screen.getByText(/Description/i)
    expect(description).toBeInTheDocument()
    
    const price = screen.getByText(/Price/i)
    expect(price).toBeInTheDocument()
    
    const imageUrl = screen.getByText(/Image Url/i)
    expect(imageUrl).toBeInTheDocument()

    const inputFields = screen.getAllByRole("textbox")
    expect(inputFields).toHaveLength(4)

    const numberInputFields = screen.getAllByRole("spinbutton")
    expect(numberInputFields).toHaveLength(1)

    const actionButtons = screen.getAllByRole("button")
    expect(actionButtons).toHaveLength(3)
  })

  it("should display error for empty input fields",async () => {
    render(<NewItemForm/>,{wrapper:TestProviders})

    const submitButton = screen.getByText(/Submit/i)
    await submitButton.click()

    const titleError = screen.getByText(/Title is required/i)
    expect(titleError).toBeInTheDocument()
    const priceError = screen.getByText(/Price is required/i)
    expect(priceError).toBeInTheDocument()
    const imageUrlError = screen.getByText(/Image Url is required/i)
    expect(imageUrlError).toBeInTheDocument()
  })

  it("should display error for title less than 3 chars",async () => {
    render(<NewItemForm/>,{wrapper:TestProviders})

    const inputFields:HTMLInputElement[] = screen.getAllByRole("textbox")
    const titleInput = inputFields[1]
    await fireEvent.change(titleInput,{target:{value:"he"}})

    const submitButton = screen.getByText(/Submit/i)
    await submitButton.click()

    const titleError = screen.getByText(/Title must be longer than 3 chars/i)
    expect(titleError).toBeInTheDocument()
  })

  it("should display error for price less than 0",async () => {
    render(<NewItemForm/>,{wrapper:TestProviders})

    const priceInputField:HTMLInputElement = screen.getByRole("spinbutton")
    await fireEvent.change(priceInputField,{target:{value:-1}})

    const submitButton = screen.getByText(/Submit/i)
    await submitButton.click()

    const priceError = screen.getByText(/Price must be greater than 0/i)
    expect(priceError).toBeInTheDocument()
  })
})
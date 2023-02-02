import React, { useState, useRef, useContext} from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

import { itemType } from "../interfaces/Item";
import { ShopContext } from "src/context/ShopContext";

export const NewItemForm: React.FC = (): JSX.Element | null => {
  const navigate = useNavigate();
  const { setItems } = useContext(ShopContext);

  const [form, setForm] = useState<itemType>({
    id: 0,
    title: "",
    description: "",
    image: "",
    price: 0,
    wishlisted: false,
  });

  const [error, setError] = useState({ title: "", price: "", imgsrc: "" });

  //Adds new item to the items
  const addNewItem = async (item: itemType): Promise<void> => {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: "test product",
        price: 13.5,
        description: "lorem ipsum set",
        image: "https://i.pravatar.cc",
        category: "electronic",
      }),
    });
    const data = await res.json();
    console.log(data);
    setItems((prev) => {
      return [...prev, { ...item, id: Math.floor(Math.random() * 500) }];
    });
  };

  const validate = () => {
    let errorsPresent = false;
    setError((curr) => {
      let currentErrors = {
        title: "",
        price: "",
        imgsrc: "",
      };

      if (!form.title) {
        currentErrors.title = "Title is required";
        errorsPresent = true;
      } else if (form.title.length < 3) {
        currentErrors.title = "Title must be longer than 3 chars";
        errorsPresent = true;
      }

      if (!form.price) {
        currentErrors.price = "Price is required";
        errorsPresent = true;
      } else if (Number(form.price) <= 0) {
        currentErrors.price = "Price must be greater than 0";
        errorsPresent = true;
      }

      if (!form.image) {
        currentErrors.imgsrc = "Image Url is required";
        errorsPresent = true;
      }

      return currentErrors;
    });
    return errorsPresent;
  };

  //Debouncing validation
  const timeOutId = useRef<NodeJS.Timeout | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: itemType) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
    timeOutId.current && clearTimeout(timeOutId.current);
    timeOutId.current = setTimeout(() => {
      validate();
    }, 500);
  };

  const clearForm = () => {
    setForm((prev) => {
      return {
        id: NaN,
        title: "",
        description: "",
        image: "",
        price: 0,
        wishlisted: false,
      };
    });
  };

  const addItem = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validate()) {
      addNewItem(form);
      clearForm();
      navigate("/");
    }else{
      console.log("Erros in form, not submitted.")
    }
  };

  const inpRef = useRef<HTMLInputElement>(null);
  const queryParams = new URLSearchParams(window.location.search);

  return (
    <div className="modal-container">
      <div className="modal">
        <input
          ref={inpRef}
          type="text"
          value={queryParams.get("q") || "React Test"}
          disabled
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1
            style={{
              marginBottom: "10px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            New item.
          </h1>
        </div>

        <form onSubmit={addItem}>
          <div>
            <label>Title : </label>
            <input
              className="form-input"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              onBlur={validate}
            ></input>
          </div>
          <p>{error.title}</p>
          <div>
            <label>Description : </label>
            <input
              className="form-input"
              name="description"
              type="text"
              value={form.description}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label>Price : </label>
            <input
              className="form-input"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              onBlur={validate}
            ></input>
          </div>
          <p>{error.price}</p>
          <div>
            <label>Image Url : </label>
            <input
              className="form-input"
              name="image"
              type="text"
              value={form.image}
              onChange={handleChange}
              onBlur={validate}
            ></input>
          </div>
          <p>{error.imgsrc}</p>
          <div className="form-actions">
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
            <button
              type="reset"
              onClick={() => {
                clearForm();
              }}
            >
              Clear
            </button>
            <button
              type="submit"
              disabled={Boolean(error.title || error.price || error.imgsrc)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

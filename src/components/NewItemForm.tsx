import React, { useState, useRef, useContext } from "react";
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
    desc: "",
    imgsrc: "",
    price: 0,
    wishlisted: false,
  });

  const [error, setError] = useState({ title: "", price: "", imgsrc: "" });

  //Adds new item to the items
  const addNewItem = (item: itemType): void => {
    setItems((prev) => {
      return [...prev, { ...item, id: Math.floor(Math.random() * 500) }];
    });
  };

  const validate = () => {
    setError((curr) => {
      let currentErrors = {
        title: "",
        price: "",
        imgsrc: "",
      };

      if (!form.title) {
        currentErrors.title = "Title is required";
      } else if (form.title.length < 3) {
        currentErrors.title = "Title must be longer than 3 chars";
      }

      if (!form.price) {
        currentErrors.price = "Price is required";
      } else if (Number(form.price) <= 0) {
        currentErrors.price = "Price must be greater than 0";
      }

      // if (!form.imgsrc) {
      //   currentErrors.imgsrc = "Image Url is required";
      // }

      return currentErrors;
    });
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
        desc: "",
        imgsrc: "",
        price: 0,
        wishlisted: false,
      };
    });
  };

  const addItem = (event: React.FormEvent) => {
    event.preventDefault();
    validate();
    setError((curr) => {
      //checking if there is any error in the error object
      if (!Boolean(curr.title || curr.price || curr.imgsrc)) {
        addNewItem!(form);
        clearForm();
        navigate("/");
      }
      return curr;
    });
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
          {error.title}
          <div>
            <label>Description : </label>
            <input
              className="form-input"
              name="desc"
              type="text"
              value={form.desc}
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
          {error.price}
          <div>
            <label>Image Url : </label>
            <input
              className="form-input"
              name="imgsrc"
              type="text"
              value={form.imgsrc}
              onChange={handleChange}
              onBlur={validate}
            ></input>
          </div>
          {error.imgsrc}
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

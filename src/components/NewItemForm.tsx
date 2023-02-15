import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

import { itemType } from "../interfaces/Item";
import { ShopContext } from "src/context/ShopContext";

export const NewItemForm: React.FC = (): JSX.Element | null => {
  const navigate = useNavigate();
  const { dispatchItems } = useContext(ShopContext);

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
    const newId = Math.floor(Math.random() * 500);
    try {
      await fetch(
        `${process.env.REACT_APP_MY_API_BASE_URL}/product/addProduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;chardispatch=utf-8",
          },
          body: JSON.stringify({ ...item, id: newId }),
        }
      );
      dispatchItems({ type: "Add", payload: { ...item, id: newId } });
      clearForm();
      navigate("/");
    } catch (error) {
    }
  };

  const validate = () => {
    let formErrorFree = true;
    setError((curr) => {
      let currentErrors = {
        title: "",
        price: "",
        imgsrc: "",
      };

      if (!form.title) {
        currentErrors.title = "Title is required";
        formErrorFree = false;
      } else if (form.title.length < 3) {
        currentErrors.title = "Title must be longer than 3 chars";
        formErrorFree = false;
      }

      if (!form.price) {
        currentErrors.price = "Price is required";
        formErrorFree = false;
      } else if (Number(form.price) <= 0) {
        currentErrors.price = "Price must be greater than 0";
        formErrorFree = false;
      }

      if (!form.image) {
        currentErrors.imgsrc = "Image Url is required";
        formErrorFree = false;
      }

      return currentErrors;
    });
    return formErrorFree;
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

    if (validate()) {
      addNewItem(form);
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

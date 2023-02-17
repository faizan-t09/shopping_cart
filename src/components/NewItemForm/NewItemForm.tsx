import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./form&Details.css";
import { toast } from "react-toastify";
import { validate } from "./formHelper";
import { useDispatch } from "react-redux";
import itemAction from "src/React-Redux/actions/itemActions";

export const NewItemForm: React.FC = (): JSX.Element | null => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      toast.success("Added product sucessfully.");
      dispatch(itemAction.add({ ...item, id: newId }));
      clearForm();
      navigate("/");
    } catch (error) {
      toast.error("Failed to add item.");
    }
  };

  //Debouncing validation
  const timeOutId = useRef<NodeJS.Timeout | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: itemType) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
    timeOutId.current && clearTimeout(timeOutId.current);
    timeOutId.current = setTimeout(() => {
      checkErrors();
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

  const checkErrors = () => {
    const { formErrorFree, currentErrors } = validate(form);
    setError(currentErrors);
    return formErrorFree;
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (checkErrors()) {
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

        <form onSubmit={onSubmitHandler}>
          <div>
            <label>Title : </label>
            <input
              className="form-input"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              onBlur={checkErrors}
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
              onBlur={checkErrors}
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
              onBlur={checkErrors}
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

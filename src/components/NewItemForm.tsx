import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

import { itemType } from "../interfaces/Item";

interface newItemProps {
  addNewItem: (item: itemType) => void;
}

export const NewItemForm: React.FC<newItemProps> = ({
  addNewItem,
}: newItemProps): JSX.Element | null => {
  const navigate = useNavigate();

  const [form, setForm] = useState<itemType>({
    title: "",
    desc: "",
    imgsrc: "",
    price: 0,
    wishlisted: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: itemType) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const clearForm = () => {
    setForm((prev) => {
      return {
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
    addNewItem(form);
    clearForm();
    navigate("/");
  };

  const inpRef = useRef<HTMLInputElement>(null);

  return (
    <div className="modal-container">
      <div className="modal">
        <input ref={inpRef} type="text" value="React Test" disabled />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ marginBottom: "10px" }}>New item.</h1>
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
            ></input>
          </div>
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
            ></input>
          </div>
          <div>
            <label>Image Url : </label>
            <input
              className="form-input"
              name="imgsrc"
              type="text"
              value={form.imgsrc}
              onChange={handleChange}
            ></input>
          </div>
          <div className="form-actions">
            <button
              onClick={() => {
                navigate("/");
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
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import "./Modal.css";
import { HiXMark } from "react-icons/hi2";

import { itemType } from "../interfaces/Item";

interface newItemProps {
  formOpen: boolean;
  closeForm: () => void;
  addNewItem: (item: itemType) => void;
}

export const NewItemForm: React.FC<newItemProps> = ({
  formOpen,
  closeForm,
  addNewItem,
}: newItemProps): JSX.Element | null => {
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
    closeForm();
  };

  if (!formOpen) return null;
  return (
    <div className="modal-container">
      <div className="modal">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ marginBottom: "10px" }}>New item.</h1>
          <HiXMark
            className="close-icon"
            size="30px"
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => {
              closeForm();
            }}
          />
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

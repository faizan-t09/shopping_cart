import "./Card.css";
import { useState } from "react";
import { HiXMark } from "react-icons/hi2";
import { Modal } from "./Modal.js";

export const Card = (props) => {
  const [modal, setModal] = useState(false);

  return (
    <>
    <div className="card" onClick={()=>{setModal(true)
    console.log("Modal");}}>
      {props.delete ? (
        <HiXMark
          className="delete-icon"
          size="20px"
          color="red"
          onClick={(e) => {
            e.stopPropagation();
            props.deleteItem(props.item);
          }}
        />
      ) : (
        <></>
      )}
      <img src={props.item.imgsrc} alt="product visual"></img>
      <h1>{props.item.title}</h1>
      <p>{props.item.desc}</p>
      <div className="actions">
        <button onClick={(e)=>{e.stopPropagation();console.log("Wish list")}}>Wish list</button>
        <button onClick={(e)=>{e.stopPropagation();console.log("Add to cart")}}>Add to cart</button>
      </div>
    </div>
      <Modal
        open={modal}
        closeModal={()=>{setModal(false)}}
        item={props.item}
      />
      </>
  );
};

import "./Card.css"
import {HiXMark} from "react-icons/hi2"

export const Card = (props) => {
  return (
    <div className="card">
        {props.delete ? <HiXMark className="delete-icon" size="20px" color="red" onClick={()=>{props.deleteItem(props.item)}}/> : <></>}
        <img src={props.item.imgsrc} alt="product visual"></img>
        <h1>{props.item.title}</h1>
        <p>{props.item.desc}</p>
        <div className="actions">
            <button>Wish list</button>
            <button>Add to cart</button>
        </div>
    </div>
  )
}
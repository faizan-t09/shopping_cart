import "./Card.css"


export const Card = (props) => {
  return (
    <div className="card">
        
        <img src={props.item.imgsrc} alt="product visual"></img>
        <h1>{props.item.title}</h1>
        <p>{props.item.desc}</p>
        
    </div>
  )
}
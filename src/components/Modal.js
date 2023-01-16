import "./Modal.css";
export const Modal = ({ open, closeModal, item }) => {
  if (!open) return null;
  return (
    <div className="modal-container">
      <div className="modal">
        <img src={item.imgsrc} alt="product visual"/>
        <h1>{item.title}</h1>
        <p>{item.desc}</p>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

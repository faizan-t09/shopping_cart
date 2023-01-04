import './App.css';
import {Card} from "./components/Card.js"

function App() {
  let items = [{title:"Book",desc:"plain ol book",imgsrc:"https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu-Book.jpg"},{title:"cup",desc:"To hold your coffee",imgsrc:"https://m.media-amazon.com/images/I/715W6s7x9rL._SX450_.jpg"},{title:"chair",desc:"To sit comfortably",imgsrc:"https://ii1.pepperfry.com/media/catalog/product/r/o/800x880/royal-wing-chair-in-blue-colour-by-dreamzz-furniture-royal-wing-chair-in-blue-colour-by-dreamzz-furn-pitcjr.jpg"},{title:"Book",desc:"plain ol book",imgsrc:"https://www.bookgeeks.in/wp-content/uploads/2022/11/The-Art-of-War-by-Sun-Tzu-Book.jpg"},{title:"cup",desc:"To hold your coffee",imgsrc:"https://m.media-amazon.com/images/I/715W6s7x9rL._SX450_.jpg"},{title:"chair",desc:"To sit comfortably",imgsrc:"https://ii1.pepperfry.com/media/catalog/product/r/o/800x880/royal-wing-chair-in-blue-colour-by-dreamzz-furniture-royal-wing-chair-in-blue-colour-by-dreamzz-furn-pitcjr.jpg"}]
  return (
    <div className="App">
      <header className="App-header">
        Welcome
      </header>
      <div className='card-container'>
        {items.map((item)=>{
          return <Card item={item} delete={true}/>
        })}
      </div>
    </div>
  );
}

export default App;

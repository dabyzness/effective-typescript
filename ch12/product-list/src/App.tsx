import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

import { Collection } from "./components/Products";
import CollectionView from "./components/CollectionView";
import { Product } from "./components/Products";
import DetailView from "./components/DetailView";

const collection = new Collection();

function App() {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>(null);

  function showDetailView(id: number) {
    let foundItem: Product | undefined = collection.items.find(
      (item: Product) => item.id === id
    );

    if (foundItem) {
      setProduct(foundItem);
      setShowDetails(true);
    }
  }

  function handleClose() {
    console.log(`App: handleClose()`);
    setProduct(null);
    setShowDetails(false);
  }

  return (
    <div className="App">
      <CollectionView {...collection} handleItemClicked={showDetailView} />
      <DetailView
        open={showDetails}
        product={product}
        handleClose={handleClose}
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

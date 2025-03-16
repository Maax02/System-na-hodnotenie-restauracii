import './App.css'
import { useState, FormEvent } from "react";


function Header() {
  return (
    <nav>
      <div id="userDiv">
        <button type="submit" > Zaregistrovat sa </button>
        <button type="submit" > Prihlasit sa </button>
      </div>
    </nav>
  );
}

function FindByName() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Hľadaný výraz: ${searchTerm}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          placeholder="Zadajte reštauráciu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" > Search </button>
      </form>
    </div>
  );
}

function App({ children }: any) {
  return (
    <>
      <Header></Header>
      <FindByName></FindByName>
      <h1>Vitajte na hlavnej stránke!</h1>
      <p> Stranka bude sluzit na vyhladavanie a recenzovanie restauracii. Na pisanie recenzii je sa nutne prihlasit. </p>
      <div>{children}</div>
    </>
  );
}

export default App

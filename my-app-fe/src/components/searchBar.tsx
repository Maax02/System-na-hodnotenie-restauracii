import { useState, FormEvent } from "react";

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

export default FindByName
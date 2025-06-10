import { useEffect, useState } from "react";
import "./pokemon-list.scss";
import type { Pokemon } from "../../../core/models/pokemon";
import type { ApiResponse } from "../../../core/models/api-response";
import { Link } from "react-router-dom";

function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(currentUrl);

        if (!res.ok) throw new Error("Failed to fetch");
        const data: ApiResponse = await res.json();

        setPokemon(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      } catch (err) {
        setError("Failed to fetch Pokémon");
      } finally {
        setLoading(false);
      }
    };

    if (currentUrl) {
      fetchPokemon();
    }
  }, [currentUrl]);

  return (
    <div id="PokemonList" className="pokemon-list">
      {loading && <div className="loading">Loading Pokémon...</div>}
      {error && <div className="error">{error}</div>}

      {!loading && !error && (
        <>
          <h2>Pokémon List</h2>
          <ul>
            {pokemon.map((p, index) => (
              <li key={index}>
                <Link to={`/pokemon/${p.name}`} className="pokemon-link">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pagination">
            <button
              onClick={() => prevUrl && setCurrentUrl(prevUrl)}
              disabled={!prevUrl}
              className="btn"
            >
              Previous
            </button>

            <button
              onClick={() => {
                if (nextUrl) {
                  setCurrentUrl(nextUrl);
                }
              }}
              disabled={!nextUrl}
              className="btn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PokemonList;

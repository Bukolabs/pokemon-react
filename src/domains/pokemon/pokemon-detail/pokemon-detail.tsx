import { useParams } from "react-router-dom";
import "./pokemon-detail.scss";
import { useEffect, useState } from "react";
import type { PokemonDetailType } from "../../../core/models/pokemon-detail";

function PokemonDetail() {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error("Failed to fetch Pokémon details");
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        setError("Failed to load Pokémon details");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [name]);

  if (loading) return <div>Loading details...</div>;
  if (error) return <div>{error}</div>;
  if (!pokemon) return null;

  return (
    <div id="PokemonDetail">
      <h2>{pokemon.name.toUpperCase()}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
}

export default PokemonDetail;

import "./App.scss";
import { Link, Route, Routes } from "react-router-dom";
import PokemonList from "./domains/pokemon/pokemon-list/pokemon-list";
import PokemonDetail from "./domains/pokemon/pokemon-detail/pokemon-detail";

const Home = () => <h2>Home Page</h2>;
const About = () => <h2>About Page</h2>;
const NotFound = () => <h2>404 - Not Found</h2>;

function App() {
  return (
    <div id="App">
      <div className="p-4">
        <nav className="app-menu">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/pokemon">Pokemon</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pokemon" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

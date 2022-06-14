import { useState } from "react";
import useCharactersList from "./swr";
import "./App.css";

const App = () => {
  const [name, setName] = useState(null);
  const [params, setParams] = useState(null);
  const {
    charactersData,
    isLoading: isLoadingCharacters,
    isError: isErrorCharacters,
  } = useCharactersList(params);

  const onSubmit = (event) => {
    event.preventDefault();
    if (name)
      setParams({
        nameStartsWith: name,
      });
    else setParams(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmit} className="Character-Form">
          <label>
            O nome do personagem começa com:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="Character-Name-Input"
            />
            <input type="submit" value="Enviar" />
          </label>
        </form>
        {charactersData &&
          charactersData.results.map((character) => (
            <div className="Character-Container" key={character.id}>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="Character-Image"
              />
              <div className="Character-Info-Container">
                <p className="Character-Title">{character.name}</p>
                <p>{character.description}</p>
              </div>
            </div>
          ))}
        {isLoadingCharacters && <p>Carregando...</p>}
        {isErrorCharacters && <p>Ocorreu um erro!</p>}
        {!charactersData && !isErrorCharacters && !isLoadingCharacters && (
          <p>Nada foi encontrado.</p>
        )}
      </header>
    </div>
  );
};

export default App;

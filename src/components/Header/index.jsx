import { useTheme } from "../../stylesAndContexts/ThemeContext";
import { Col, Container, HeaderContainer, Home, Select } from "./styles";
import { SwitcherButton } from "./styles";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = ({ selectedGen, onGenChange, selectedType, onTypeChange, pokemonPage }) => {
  const { toggleTheme, themeMode } = useTheme();

  return (
    <>
      <Container>
        <HeaderContainer>
          <h1>Pokédex</h1>
          {!pokemonPage? 
            <>
              <Col>
                <label htmlFor="gens">Geração</label>
                <Select
                  name="gens"
                  id="gens"
                  value={selectedGen}
                  onChange={(e) => onGenChange(e.target.value)}
                >
                  <option value="1">Gen 1</option>
                  <option value="2">Gen 2</option>
                  <option value="3">Gen 3</option>
                  <option value="4">Gen 4</option>
                  <option value="5">Gen 5</option>
                  <option value="6">Gen 6</option>
                  <option value="7">Gen 7</option>
                  <option value="8">Gen 8</option>
                  <option value="9">Gen 9</option>
                </Select>
              </Col>
              <Col>
                <label htmlFor="types">Tipos</label>
                <Select
                  name="types"
                  id="types"
                  value={selectedType}
                  onChange={(e) => onTypeChange(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="1">Normal</option>
                  <option value="2">Lutador</option>
                  <option value="3">Voador</option>
                  <option value="4">Venenoso</option>
                  <option value="5">Terra</option>
                  <option value="6">Rocha</option>
                  <option value="7">Inseto</option>
                  <option value="8">Fantasma</option>
                  <option value="9">Aço</option>
                  <option value="10">Fogo</option>
                  <option value="11">Água</option>
                  <option value="12">Planta</option>
                  <option value="13">Elétrico</option>
                  <option value="14">Psíquico</option>
                  <option value="15">Gelo</option>
                  <option value="16">Dragão</option>
                  <option value="17">Sombrio</option>
                  <option value="18">Fada</option>
                </Select>
              </Col>
            </> : <Home to={"/"} >Home</Home>
          }
          <SwitcherButton onClick={toggleTheme} aria-label="Alternar tema">
            {themeMode === "light" ? <FaMoon /> : <FaSun />}
          </SwitcherButton>
        </HeaderContainer>
      </Container>
    </>
  );
};

export { Header };

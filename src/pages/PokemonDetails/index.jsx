import { Header } from "../../components/Header";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MainContainer, Col, Row, Grid } from "./styles";

const fetchPokemonDetails = async ({ queryKey }) => {
  const [_key, pokemonName] = queryKey;
  const { data: pokemonData } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );

  const abilityPromises = pokemonData.abilities.map((habilidade) =>
    axios.get(habilidade.ability.url)
  );
  const abilityResponses = await Promise.all(abilityPromises);
  const abilitiesDetails = abilityResponses.map(response => response.data);

  return {
    pokemon: pokemonData,
    abilitiesDetails: abilitiesDetails,
  };
};

const PokemonDetails = () => {
  const { pokemonName } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pokemon", pokemonName], // Chave única para este Pokémon
    queryFn: fetchPokemonDetails,
  });

  if (isLoading) {
    return <div>Carregando detalhes do Pokémon...</div>;
  }

  if (isError) {
    return <div>Erro ao buscar dados: {error.message}</div>;
  }

  // Se chegou aqui, temos os dados!
  return (
    <>
      <Header pokemonPage={true} />
      <MainContainer bg={data.pokemon.types[0].type.name}>
        <Col align="center">
          <h1>{data.pokemon.name.toUpperCase()}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.pokemon.id}.png`}
            alt={data.pokemon.name}
          />
        </Col>
        <Col align="start" gap={1.5}>
          <h2>Especificações</h2>
          <Row>
            <h3>Tipo:</h3>
            {data.pokemon.types.map((tipo) => (
              <p>{tipo.type.name}</p>
            ))}
          </Row>
          <Row>
            <h3>Movimentos:</h3>
            <Grid col={3} > 
              {data.pokemon.moves.map((movimentos, index) => (
                <li key={index}>{movimentos.move.name}</li>
              ))}
            </Grid>
          </Row>
          <Row>
            <h3>Habilidades:</h3>
            <Grid col={1} >
              {data.pokemon.abilities.map((habilidades, index) => {
                const abilityDetail = data.abilitiesDetails[index];
                const effectEntry = abilityDetail.effect_entries.find(
                  (entry) => entry.language.name === "en"
                );
                const description = effectEntry ? effectEntry.short_effect : "Descrição não disponível.";

                return (
                  <li key={index}>
                    <b>{habilidades.ability.name}</b>
                    <p>{description}</p>
                  </li>
                );
              })}
            </Grid>
          </Row>
        </Col>
      </MainContainer>
    </>
  );
};

export { PokemonDetails };

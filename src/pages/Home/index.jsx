import React, { useState } from "react"; // Adicionei React para o Fragment
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Header } from "../../components/Header";
import { PokeCard } from "../../components/PokeCard";
import axios from "axios";
import { CardContainer, Loading, MainContainer } from "./styles";
import { Link } from "react-router";

const generationOffsets = {
  1: 0,
  2: 151,
  3: 251,
  4: 386,
  5: 493,
  6: 649,
  7: 721,
  8: 809,
  9: 905,
};

const limit = 10;

const fetchPokemonsByGen = async ({ pageParam = 0, queryKey }) => {
  const [_key, gen] = queryKey;

  // Garante que começa no offset correto da geração
  const baseOffset = generationOffsets[gen];
  const offset = baseOffset + pageParam;

  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const { data } = await axios.get(url);

  const pokemonGeneralList = data.results;
  const pokemonDetailsPromises = pokemonGeneralList.map((pokemon) =>
    axios.get(pokemon.url)
  );
  const detailedPokemonResponses = await Promise.all(pokemonDetailsPromises);
  const newPokemons = detailedPokemonResponses.map((res) => res.data);

  // Agora a lógica usa o 'gen' que recebemos via queryKey
  const nextGenNumber = parseInt(gen) + 1;
  const endOffset = generationOffsets[nextGenNumber] || 9999;
  const potentialNextOffset = pageParam + limit;

  const result = {
    pokemons: newPokemons,
    nextPageParam:
      potentialNextOffset < endOffset ? potentialNextOffset : undefined,
  };

  return result;
};

const fetchPokemonsByType = async ({ queryKey }) => {
  const [_key, gen, type] = queryKey;

  const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${type}`);
  const allPokemonsOfType = data.pokemon.map((p) => p.pokemon);

  // Filtra pela geração
  const startOffset = generationOffsets[gen];
  const nextGenNumber = parseInt(gen) + 1;
  const endOffset = generationOffsets[nextGenNumber] || 9999;

  const pokemonsInGenerationAndTypeUrls = allPokemonsOfType
    .map((p) => p.url)
    .filter((url) => {
      const id = parseInt(url.match(/\/pokemon\/(\d+)\//)?.[1]);
      return id > startOffset && id <= endOffset;
    });

  // Busca os detalhes de todos os Pokémon filtrados de uma vez
  const details = await Promise.all(
    pokemonsInGenerationAndTypeUrls.map((url) => axios.get(url))
  );

  // Retorna um array simples de pokemons
  return details.map((res) => res.data);
};

const Home = () => {
  const [selectedGen, setSelectedGen] = useState("1");
  const [selectedType, setSelectedType] = useState("all");

  // --- HOOK 1: PAGINAÇÃO INFINITA ---
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["pokemons", selectedGen],
    queryFn: fetchPokemonsByGen,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    initialPageParam: generationOffsets[selectedGen],
    // SÓ RODA SE O TIPO FOR 'all'
    enabled: selectedType === "all",
  });

  // --- HOOK 2: BUSCA ÚNICA POR TIPO ---
  const typeQuery = useQuery({
    queryKey: ["type", selectedGen, selectedType],
    queryFn: fetchPokemonsByType,
    enabled: selectedType !== "all",
  });

  const isLoading = infiniteQuery.isLoading || typeQuery.isLoading;
  const isError = infiniteQuery.isError || typeQuery.isError;
  const error = infiniteQuery.error || typeQuery.error;

  // Unificação dos dados para renderização
  let pokemonList = [];
  if (selectedType === "all" && infiniteQuery.data) {
    // Se o tipo for 'all', pegamos os dados paginados e "achatamos" o array
    pokemonList = infiniteQuery.data.pages.flatMap((page) => page.pokemons);
  } else if (selectedType !== "all" && typeQuery.data) {
    // Se for um tipo específico, a lista já vem pronta do `useQuery`
    pokemonList = typeQuery.data;
  }

  const handleGenChange = (gen) => setSelectedGen(gen);
  const handleTypeChange = (type) => setSelectedType(type);

  return (
    <>
      <Header
        selectedGen={selectedGen}
        onGenChange={handleGenChange}
        selectedType={selectedType}
        onTypeChange={handleTypeChange}
      />
      <MainContainer>
        {isLoading && <p>Carregando pela primeira vez...</p>}
        {isError && <p>Ocorreu um erro: {error.message}</p>}

        <CardContainer>
          {pokemonList.length ? (
            pokemonList.map((pokemon) => (
              <Link to={`/pokemon/${pokemon.name}`}>
                <PokeCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  bg={pokemon.types[0].type.name}
                />
              </Link>
            ))
          ) : (
            <p>Não há pokémons desse tipo nessa geração.</p>
          )}
        </CardContainer>

        <Loading
          onClick={() => infiniteQuery.fetchNextPage()}
          disabled={
            !infiniteQuery.hasNextPage || infiniteQuery.isFetchingNextPage
          }
        >
          {infiniteQuery.isFetchingNextPage
            ? "Carregando mais..."
            : infiniteQuery.hasNextPage
            ? "Carregar Mais"
            : "Não há mais Pokémons"}
        </Loading>
      </MainContainer>
    </>
  );
};

export { Home };

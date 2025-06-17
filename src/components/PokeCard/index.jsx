import { CardContainer, Name } from "./styles";

const PokeCard = ({ pokemon, bg }) => {
  return (
    <>
      <CardContainer bg={bg} >
        <span>#{pokemon.id}</span>
        <Name>{pokemon.name}</Name>
        {pokemon.types.map((tipo, index) => (
          <p key={index}>{tipo.type.name}</p>
        ))}
        <div>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
            alt={pokemon}
          />
        </div>
      </CardContainer>
    </>
  );
};

export { PokeCard };

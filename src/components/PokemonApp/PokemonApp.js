import { useState, useEffect } from "react";
import Section from "../Section";
import PokemonForm from "./PokemonForm";
import PokemonInfo from "./PokemonInfo";
import PokemonErrorMsg from "./PokemonErrorMsg";
import PokemonLoadMsg from "./PokemonLoadMsg";
import fetchPokemon from "./fetchPokemon";

const enumStatus = {
    idle: 1,
    pending: 2,
    rejected: 3,
    resolved: 4,
};

const initState = {
    pokemon: null,
    pokemonName: null,
    error: null,
    status: enumStatus.idle,
};

const loadMsg = "Идет загрузка...";

export default function PokemonApp() {
    const [pokemon, setPokemon] = useState(null);
    const [query, setQuery] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(enumStatus.idle);

    const handleSubmit = name => {
        setQuery(name);
    };

    useEffect(
        () => {
            setStatus(enumStatus.pending);
            setTimeout(
                () => {
                    fetchPokemon(query)
                        .then(
                            response => {
                                setPokemon(response);
                                setStatus(enumStatus.resolved);
                            }
                        )
                        .catch(
                            error => {
                                setError(error);
                                setStatus(enumStatus.rejected);
                            }
                        )
                }, 1000
            );
        },
        [query]
    );

    return (
        <Section title="Pokemon App">
            <PokemonForm onSubmit={handleSubmit} />
            {
                status === enumStatus.rejected &&
                <PokemonErrorMsg msg={error.message} />
            }
            {
                status === enumStatus.pending &&
                <PokemonLoadMsg msg={loadMsg} />
            }
            {
                status === enumStatus.resolved &&
                <PokemonInfo info={pokemon} />
            }
        </Section>
    );
}

// componentDidUpdate(prevProps, prevState) {
//     const prevName = prevState.pokemonName;
//     const nextName = this.state.pokemonName;

//     if (prevName !== nextName) {
//         this.setState({ status: enumStatus.pending });

//         setTimeout(
//             () => {
//                 fetchPokemon(nextName)
//                     .then(pokemon => this.setState({ pokemon, status: enumStatus.resolved }))
//                     .catch(error => this.setState({ error, status: enumStatus.rejected }))
//             }, 1000
//         );
//     };
// };
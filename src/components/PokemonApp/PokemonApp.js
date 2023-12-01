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
    query: null,
    error: null,
    status: enumStatus.idle,
};

const loadMsg = "Идет загрузка...";

export default function PokemonApp() {
    const [pokemon, setPokemon] = useState(initState.pokemon);
    const [query, setQuery] = useState(initState.query);
    const [error, setError] = useState(initState.error);
    const [status, setStatus] = useState(initState.status);

    const handleSubmit = query => {
        setQuery(query);
    };

    useEffect(
        () => {
            if (query !== initState.query) {
                setError(initState.error);
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
            }
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
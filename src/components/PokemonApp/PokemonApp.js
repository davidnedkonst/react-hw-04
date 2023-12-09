import { useState, useEffect } from "react";
import Section from "../Section";
import PokemonForm from "./PokemonForm";
import PokemonInfo from "./PokemonInfo";
import PokemonErrorMsg from "./PokemonErrorMsg";
import PokemonLoadMsg from "./PokemonLoadMsg";
import fetchPokemon from "./fetchPokemon";
import Status from "./Status";

const initState = {
    pokemon: null,
    query: null,
    error: null,
    status: Status.IDLE,
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

    //Reset and update status
    useEffect(
        () => {
            if (pokemon !== initState.pokemon) {
                setQuery(initState.query);
                setStatus(Status.RESOLVED);
            }
        },
        [pokemon]
    );

    useEffect(
        () => {
            if (query !== initState.query) {
                setError(initState.error);
                setStatus(Status.PENDING);
            }
        },
        [query]
    );

    useEffect(
        () => {
            if (error !== initState.error) {
                setQuery(initState.query);
                setPokemon(initState.pokemon);
                setStatus(Status.REJECTED);
            }
        },
        [error]
    );

    //Fetch
    useEffect(
        () => {
            if (status !== Status.PENDING) return;

            setTimeout(
                () => {
                    fetchPokemon(query)
                        .then(response => setPokemon(response))
                        .catch(error => setError(error))
                }, 1000
            );
        },
        [query, status]
    );

    return (
        <Section title="Pokemon App">
            <PokemonForm onSubmit={handleSubmit} />
            {
                status === Status.REJECTED &&
                <PokemonErrorMsg msg={error.message} />
            }
            {
                status === Status.PENDING &&
                <PokemonLoadMsg msg={loadMsg} />
            }
            {
                status === Status.RESOLVED &&
                <PokemonInfo info={pokemon} />
            }
        </Section>
    );
}
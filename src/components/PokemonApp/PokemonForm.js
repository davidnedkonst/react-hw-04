import { useState } from "react";

const alertMsg = "Enter name!";

export default function PokemonForm({ onSubmit }) {
    const [name, setName] = useState('');

    const handleNameChange = ({ currentTarget: { value } }) => {
        setName(value.toLowerCase().trim());
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (!name) {
            alert(alertMsg);
            return;
        }

        onSubmit(name);
        
        setName('');
    };

    return (
        <div>
            <form autoComplete="on" onSubmit={handleSubmit}>
                <input
                    name="pokemonName"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Pokemon Name" />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};
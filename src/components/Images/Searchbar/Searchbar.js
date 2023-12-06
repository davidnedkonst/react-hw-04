import { useState } from "react";
import { FaSearch } from "react-icons/fa";

import css from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
    const [search, setSearch] = useState('');
    const alertMsg = "Enter name!";

    const handleChange = ({ currentTarget: { value } }) => {
        setSearch(value.toLowerCase().trim());
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (!search) {
            alert(alertMsg);
            return;
        }
        onSubmit(search);
        // setSearch('');
    };

    return (
        <div className={css.Searchbar}>
            <form
                className={css.form}
                onSubmit={handleSubmit}
                autoComplete="on"
            >
                <button
                    type="submit"
                    className={css.button}
                >
                    <FaSearch />
                </button>

                <input
                    className={css.input}
                    type="text"
                    autoFocus
                    placeholder="Search images and photos"
                    value={search}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
};
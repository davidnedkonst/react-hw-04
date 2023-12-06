import css from "./Button.module.css";

export default function Button({ show, name, onClick }) {
    if (show)
        return (
            <button
                type="button"
                className={css.Button}
                onClick={onClick}
            >{name}</button>
        );
};
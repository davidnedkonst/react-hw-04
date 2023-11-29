import css from "./Button.module.css";

export default function Button({ show, onLoadClick }) {
    if (show)
        return (
            <button
                type="button"
                className={css.Button}
                onClick={onLoadClick}
            >
                Load
            </button>
        );
};
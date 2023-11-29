import { FaSpinner } from "react-icons/fa";
import css from "./Loader.module.css";

export default function Loader({ show }) {
    if (show)
        return (
            <div className={css.Loader}>
                <FaSpinner />
            </div>
        );
};
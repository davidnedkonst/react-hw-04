import { FirstToUpperCase } from '../../../utils';
import PropTypes from 'prop-types';

export default function ContactList({ contacts, onDelete }) {
    return (
        <ul>
            {
                contacts.map(({ id, name, tel }) =>
                    <li key={id}>
                        <p>{FirstToUpperCase(name) + ':\t'}
                            <span>{tel}</span>
                        </p>
                        <button onClick={() => onDelete(id)}>Delete</button>
                    </li>
                )
            }
        </ul>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            tel: PropTypes.string,
        })
    ),
    onDelete: PropTypes.func,
};
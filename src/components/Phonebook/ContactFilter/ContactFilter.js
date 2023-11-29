import PropTypes from 'prop-types';

export default function ContactFilter({ value, onChange }) {
    return (
        <form>
            <label htmlFor="search">Find contact</label>
            <input name="search" type="text" value={value} onChange={onChange} />
        </form>
    );
};

ContactFilter.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
};
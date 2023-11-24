import { FirstToUpperCase } from '../../../utils';
import PropTypes from 'prop-types';

export default function FeedbackOptions({ optionGood, optionNeutral, optionBad, onLeaveFeedback }) {
    // const optionKeys = Object.keys(options);

    return (
        <div className="FeedbackOptions">
            <button
                key={optionGood}
                className="FeedbackOption__button"
                onClick={() => onLeaveFeedback(optionGood)}
            >{FirstToUpperCase(optionGood)}
            </button>
            <button
                key={optionNeutral}
                className="FeedbackOption__button"
                onClick={() => onLeaveFeedback(optionNeutral)}
            >{FirstToUpperCase(optionNeutral)}
            </button>
            <button
                key={optionBad}
                className="FeedbackOption__button"
                onClick={() => onLeaveFeedback(optionBad)}
            >{FirstToUpperCase(optionBad)}
            </button>
        </div>
    );
};

FeedbackOptions.protoTypes = {
    options: PropTypes.shape({
        good: PropTypes.number,
        neutral: PropTypes.number,
        bad: PropTypes.number,
    }),
    onLeaveFeedback: PropTypes.func
};
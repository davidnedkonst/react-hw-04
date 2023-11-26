import { FirstToUpperCase } from '../../../utils';
import PropTypes from 'prop-types';

export default function Statistics({ options }) {
    const totalFeedback = () => {
        const values = Object.values(options);
        const total = values.reduce((acc, item) => (acc + item), 0);
        return total;
    };

    const positivePercentage = () => {
        const { good } = options;
        const total = totalFeedback();
        const positivePercentage = good / total * 100 || 0;
        console.log(positivePercentage);
        return positivePercentage.toPrecision(3) + '%';
    };

    const makeStatData = () => {
        const total = { total: totalFeedback(), };
        const positive = { 'positive feedback': positivePercentage(), };
        return { ...options, ...total, ...positive };
    };

    const msgEmpty = "No feedback give";
    const isEmpty = !totalFeedback();
    const statisticsDat = makeStatData();
    const statisticsDatKeys = Object.keys(statisticsDat);

    return (
        <div>
            {
                !isEmpty
                    ? statisticsDatKeys.map(name =>
                        <div key={name}>
                            <p>{FirstToUpperCase(name) + ':\t'}
                                <span>{statisticsDat[name]}</span>
                            </p>
                        </div>
                    )
                    : <p>{msgEmpty}</p>
            }
        </div>
    );
};


Statistics.protoTypes = {
    options: PropTypes.shape({
        good: PropTypes.number,
        neutral: PropTypes.number,
        bad: PropTypes.number,
    }),
};
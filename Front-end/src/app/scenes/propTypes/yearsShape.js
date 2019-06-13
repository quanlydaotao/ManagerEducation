import PropTypes from "prop-types";

const { shape } = PropTypes;

export default shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    startYears: PropTypes.string.isRequired,
    endYears: PropTypes.string.isRequired,
    openDay: PropTypes.string.isRequired,
    closeDay: PropTypes.string.isRequired,
    describe: PropTypes.string.isRequired,
    maximumClasses: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired
});
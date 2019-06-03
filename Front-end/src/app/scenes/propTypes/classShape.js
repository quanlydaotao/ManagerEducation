import PropTypes from "prop-types";

const { shape } = PropTypes;

export default shape( {
    id: PropTypes.number.isRequired,
    classCode: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    describe: PropTypes.string.isRequired,
    openDay: PropTypes.string.isRequired,
    closeDay: PropTypes.string.isRequired,
    classRoom: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired
});
import PropTypes from "prop-types";

const { shape } = PropTypes;

export default shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    maxClasses: PropTypes.number.isRequired,
    dateOpen: PropTypes.string.isRequired,
    dateClose: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired
});
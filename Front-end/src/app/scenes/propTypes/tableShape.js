import PropTypes from "prop-types";

const { shape } = PropTypes;

export default shape({
    id: PropTypes.number.isRequired,
    numeric: PropTypes.bool.isRequired,
    disablePadding: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired
});
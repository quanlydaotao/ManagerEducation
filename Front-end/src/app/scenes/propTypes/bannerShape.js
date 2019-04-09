import PropTypes from "prop-types";

const { shape } = PropTypes;

export default shape( {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    sort: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired
});
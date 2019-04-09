import PropTypes from "prop-types";

const { shape } = PropTypes;

export default shape( {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    parentId: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired
});
import PropTypes from "prop-types";

const { shape } = PropTypes;

export default shape( {
    loggedIn: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired
});
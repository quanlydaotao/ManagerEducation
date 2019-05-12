import PropTypes, { bool } from "prop-types";

const { shape } = PropTypes;

export default shape( {
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    activated: PropTypes.bool.isRequired,
    langKey: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    indentityCardNumber: PropTypes.string.isRequired,
});
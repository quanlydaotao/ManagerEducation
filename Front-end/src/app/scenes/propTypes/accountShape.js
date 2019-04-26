import PropTypes, { bool } from "prop-types";

const { shape } = PropTypes;

export default shape( {
    id: PropTypes.number.isRequired,
    login: PropTypes.string.isRequired,
    password_hash: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    activated: PropTypes.bool.isRequired,
    lang_key: PropTypes.string.isRequired,
    activation_key: PropTypes.string.isRequired,
    reset_key: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    indentity_card_number: PropTypes.string.isRequired
});
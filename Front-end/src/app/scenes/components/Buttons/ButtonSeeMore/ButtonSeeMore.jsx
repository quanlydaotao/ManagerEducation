import React from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const ButtonSeeMore = ({ url }) => {
    return (
        <Button component={Link} color="primary" variant="contained" to={url} className={`${styles.buttonSeeMore}`}>
            Xem thêm 
            <i class="fa fa-chevron-circle-right ml-2" aria-hidden="true"></i>
        </Button>
    );
}

ButtonSeeMore.defaultProps = {
    url: ''
}

ButtonSeeMore.propTypes = {
    url: PropTypes.string.isRequired
}

export default ButtonSeeMore;

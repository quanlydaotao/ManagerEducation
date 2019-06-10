import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LaunchIcon from '@material-ui/icons/Launch';

function ButtonEdit (props) {
    const { title, id, to } = props;
    return (
        <Tooltip title={title}>
            <Button 
                component={Link}
                to={to}
                variant="contained" 
                style={{ backgroundColor: '#17b304', color: '#fff', minWidth: 0, padding: '5px' }}
            >
                <LaunchIcon />
            </Button>
        </Tooltip>
    )
}

ButtonEdit.defaultProps = {
    title: '',
    id: 0
}

ButtonEdit.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

export default ButtonEdit;

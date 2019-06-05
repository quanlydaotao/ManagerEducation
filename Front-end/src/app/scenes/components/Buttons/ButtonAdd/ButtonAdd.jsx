import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

const style = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

const ButtonAdd = (props) => {
    const { classes } = props;
    return (
        <Tooltip title={this.props.title}>
            <Fab color={this.props.color} className={classes.fab}>
                <AddIcon />
            </Fab>
        </Tooltip>
    );
}

ButtonAdd.defaultProps = {
    title: '',
    color: 'primary'
}

ButtonAdd.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
};

export default withStyles(style)(ButtonAdd);

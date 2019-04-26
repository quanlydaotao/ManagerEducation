import React, { Component } from 'react';
import styles from './styles.css';
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
        <Tooltip title="Thêm mới tài khoản">
            <Fab color="primary" aria-label="Add" className={classes.fab}>
                <AddIcon />
            </Fab>
        </Tooltip>
    );
}
ButtonAdd.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(ButtonAdd);

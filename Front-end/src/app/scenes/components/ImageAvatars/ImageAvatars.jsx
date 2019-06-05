import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

const styles = {
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: '6px 0',
        width: 50,
        height: 50,
    },
};

function ImageAvatars(props) {
    const { classes } = props;
    return (
        <Grid container>
            <Avatar {...props} className={classes.bigAvatar} />
        </Grid>
    );
}

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);
import React, { Component } from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const style = theme => ({
    root: {
        padding: '8px 18px',
        borderRadius: '0'
    },
    chip: {
        backgroundColor: theme.palette.grey[100],
        height: 24,
        color: theme.palette.grey[800],
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: theme.palette.grey[300],
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(theme.palette.grey[300], 0.12),
        },
    },
    avatar: {
        background: 'none',
        marginRight: -theme.spacing.unit * 1.5,
    },
});

function handleClick(event) {
    event.preventDefault();
    alert('You clicked a breadcrumb.'); // eslint-disable-line no-alert
}

function CustomBreadcrumb(props) {
    const { classes, ...rest } = props;
    return <Chip className={classes.chip} {...rest} />;
}

CustomBreadcrumb.propTypes = {
    classes: PropTypes.object.isRequired,
};

const StyledBreadcrumb = withStyles(styles)(CustomBreadcrumb);

class Breadcumbs extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root} style={{marginBottom: 15}}>
            <Breadcrumbs arial-label="Breadcrumb">
            <StyledBreadcrumb
            className={`${styles.itemBreadcums}`}
            component="a"
            href="#"
            label="Trang chủ"Ba
            avatar={
                <Avatar className={classes.avatar}>
                <HomeIcon />
                </Avatar>
            }
            onClick={handleClick}
            />
            <StyledBreadcrumb className={`${styles.itemBreadcums}`} component="a" href="#" label="Quản lý tài khoản" onClick={handleClick} />
            <StyledBreadcrumb
            className={`${styles.itemBreadcums}`}
            label="Đăng ký tài khoản"
            deleteIcon={<ExpandMoreIcon />}
            onClick={handleClick}
            onDelete={handleClick}
            />
            </Breadcrumbs>
            </Paper>
            );
    }
}

Breadcrumbs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(Breadcumbs);
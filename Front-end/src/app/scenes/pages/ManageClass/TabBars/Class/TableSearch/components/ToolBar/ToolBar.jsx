import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TodayIcon from '@material-ui/icons/Today';
import Icon from '@material-ui/core/Icon';
import DevicesIcon from '@material-ui/icons/Devices';
import SaveIcon from '@material-ui/icons/Save';

const style = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class ToolBar extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={`${styles.ToolBar}`}>
                <div className="row">
                    <div className="col-md-4">
                        <div className={`text-left ${styles.count}`}>
                            <span><DevicesIcon style={{marginRight: 10}}/>HỆ THỐNG QUẢN LÝ LỚP HỌC</span>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="text-right">
                            <Button variant="outlined" className={classes.button}>
                                <QueuePlayNextIcon className={classes.leftIcon} />
                                Thêm khóa đào tạo
                            </Button>
                            <Button variant="outlined" className={classes.button} style={{ backgroundColor: '#445e6c', color: 'white' }} className={classes.button}>
                                <PlaylistAddIcon className={classes.leftIcon} />
                                Thêm mới lớp học
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ToolBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(ToolBar);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TodayIcon from '@material-ui/icons/Today';
import Icon from '@material-ui/core/Icon';
import DevicesIcon from '@material-ui/icons/Devices';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';

const style = theme => ({
    button: {
        fontSize: 13,
        fontWeight: '300'
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
                            <Tooltip component={Link} to="/admin/edu/years/new" title="Thêm năm học đào tạo mới">
                                <Button variant="outlined" className={classes.button}>
                                    <DateRangeIcon className={classes.leftIcon} />
                                    THÊM NĂM HỌC ĐÀO TẠO MỚI
                                </Button>
                            </Tooltip>
                            <Tooltip title="Thêm khóa mới">
                                <Button variant="outlined" className={classes.button}>
                                    <QueuePlayNextIcon className={classes.leftIcon} />
                                    THÊM KHÓA MỚI
                                </Button>
                            </Tooltip>
                            <Tooltip title="Thêm lớp học">
                                <Button component={Link} to="/admin/edu/classes/category" variant="outlined" className={classes.button} style={{ backgroundColor: '#445e6c', color: 'white' }} className={classes.button}>
                                    <PlaylistAddIcon className={classes.leftIcon} />
                                    THÊM LỚP HỌC
                                </Button>
                            </Tooltip>
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

export default withRouter(withStyles(style)(ToolBar));

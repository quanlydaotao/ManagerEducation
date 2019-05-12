import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/DeleteSweep';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/PrintRounded';
import BallotIcon from '@material-ui/icons/BallotRounded';
import GetAppIcon from '@material-ui/icons/GetAppRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';
import FilterListIcon from '@material-ui/icons/FilterList';

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: '#333',
                backgroundColor: '#fafafa'
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
        width: '100%',
        textAlign: 'right'
    },
    title: {
        flex: '0 0 auto',
    },
    button: {
        margin: theme.spacing.unit,
        fontSize: '11px'
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

let EnhancedTableToolBar = props => {
    const { numSelected, classes, listName } = props;
    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title} >
                {numSelected > 0 ? (
                    <Typography color="default" style={{ fontSize: 14 }} variant="subtitle1">
                        {numSelected} row(s) selected
            </Typography>
                ) : (
                        <Typography variant="h6" style={{ fontSize: 14 }} id="tableTitle">
                            <BallotIcon /> {listName}
            </Typography>
                    )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="Xóa">
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Xóa danh sách <DeleteIcon className={classes.rightIcon} />
                        </Button>
                    </Tooltip>
                ) : (
                        <div>
                            <Tooltip title="Tìm kiếm">
                                <IconButton aria-label="Tìm kiếm">
                                    <SearchIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Tải xuống danh sách excel">
                                <IconButton aria-label="Tải xuống danh sách excel">
                                    <GetAppIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="In danh sách">
                                <IconButton aria-label="In danh sách">
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Lọc danh sách">
                                <IconButton aria-label="Lọc danh sách">
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Upload">
                                <Button variant="contained" color="inherit" className={classes.button}>
                                    Upload
                                    <CloudUploadIcon className={classes.rightIcon} />
                                </Button>
                            </Tooltip>
                        </div>
                    )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolBar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(EnhancedTableToolBar);
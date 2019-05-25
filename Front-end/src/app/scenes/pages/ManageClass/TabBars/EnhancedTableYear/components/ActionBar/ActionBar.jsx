import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddIcon from '@material-ui/icons/Add';
import { NavLink } from 'react-router-dom';

const style = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginTop: 24,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    conf: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#455e6b'
    }
});

class ActionBar extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <List
                component="nav"
                subheader={<div style={{
                    padding: '0px 10px 15px', fontWeight: 'bold',
                    color: '#455e6b'
                }}>DANH SÁCH TÁC VỤ</div>}
                className={classes.root}
            >
                <ListItem component={NavLink} to="/administrator/class" button activeClassName={`${styles.active}`}>
                    <ListItemIcon>
                        <ListAltIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="DANH SÁCH NĂM HỌC" classes={{ primary: classes.conf }} />
                    <AddIcon />
                </ListItem>
                <ListItem component={NavLink} to="#" button>
                    <ListItemIcon>
                        <QueuePlayNextIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="THÊM NĂM HỌC MỚI" classes={{ primary: classes.conf }} />
                    <AddIcon />
                </ListItem>
                <ListItem component={NavLink} to="#" button>
                    <ListItemIcon>
                        <InsertChartOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="THỐNG KÊ DỮ LIỆU" classes={{ primary: classes.conf }} />
                    <AddIcon />
                </ListItem>
            </List>
        );
    }
}

ActionBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(ActionBar);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QueuePlayNextIcon from '@material-ui/icons/QueuePlayNext';
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import AddIcon from '@material-ui/icons/Add';
import { NavLink } from 'react-router-dom';

const style = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    conf: {
        fontSize: 11,
        fontWeight: '400',
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
                    fontWeight: 'bold',
                    color: '#455e6b',
                    fontSize: 13,
                    padding: 13,
                    marginBottom: 5,
                    borderRadius: '2px',
                    backgroundColor: '#f7f7f7',
                    color: 'rgb(69, 94, 107)'
                }}>DANH SÁCH CÁC TÁC VỤ</div>}
                className={classes.root}
            >
            
                <ListItem button component={NavLink} to="/admin/edu/years/new" activeClassName="activeLink">
                    <ListItemIcon>
                        <QueuePlayNextIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="THÊM NĂM HỌC MỚI" classes={{ primary: classes.conf }} />
                    <AddIcon className="iconConfig"/>
                </ListItem>
                <ListItem button component={NavLink} to="/admin/edu/years/notifications" activeClassName="activeLink">
                    <ListItemIcon>
                        <QuestionAnswerIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="THÊM THÔNG BÁO" classes={{ primary: classes.conf }}/>
                    <AddIcon className="iconConfig"/>
                </ListItem>
                <ListItem button component={NavLink} to="#" activeClassName="active">
                    <ListItemIcon>
                        <InsertChartOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText inset primary="THỐNG KÊ DỮ LIỆU" classes={{ primary: classes.conf }} />
                    <AddIcon className="iconConfig"/>
                </ListItem>
            </List>
        );
    }
}

ActionBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(style)(ActionBar));
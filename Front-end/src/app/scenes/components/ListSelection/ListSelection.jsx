import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import RateReviewIcon from '@material-ui/icons/RateReview';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const style = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflowY: 'scroll',
        height: 420,
        maxHeight: 420,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    conf: {
        fontSize: 11,
        fontWeight: '400',
        color: '#455e6b', 
    }
});


class ListSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: ''
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({
                id: 0,
                name: ''
            })
        }
    }
    setDataSelect = (param) => {
        this.setState({
            id: param.id,
            name: param.name
        });
        this.props.getSelectId(param);
    }
    render() {
        const { classes, data, dataSelect, title } = this.props;
        const { id } = this.state;
        return (
            <List className={classes.root} subheader={<li />}>
                <ListSubheader 
                    style={{
                        backgroundColor: '#ececec',
                        color: '#445e6c', 
                        fontWeight: '700', 
                        fontSize: '11px'
                    }}
                >
                    <RateReviewIcon /> 
                    {title}
                </ListSubheader>
                {data.map((value, index) => (
                    <ListItem 
                        key={index} 
                        className={`item-list ${id == value.id ? 'activeLink' : ''}`} 
                        onClick={() => this.setDataSelect({ id: value.id, name: value.name })}
                    >
                        <ListItemText 
                            primary={value.startYears ? `Năm học đào tạo [ ${value.startYears} ]` : `Khóa - ${value.name}`} 
                            classes={{ primary: classes.conf }}
                        />
                        <KeyboardArrowRightIcon />
                    </ListItem>
                ))}
            </List>
        );
    }
}


ListSelection.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
};

ListSelection.defaultProps = {
    data: {}
}

export default withStyles(style)(ListSelection);
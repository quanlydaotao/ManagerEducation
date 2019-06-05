import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import RateReviewIcon from '@material-ui/icons/RateReview';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { selectionOperations } from '../../../../../../../../state/ducks/selection';
import { connect } from 'react-redux';

const style = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        margin: '10px 0',
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
        fontSize: 13,
        fontWeight: '300',
        color: '#455e6b', 
    }
});


class ListYears extends React.Component {
    render() {
        const { classes, data, dataSelect } = this.props;
        return (
            <List className={classes.root} subheader={<li />}>
                <ListSubheader style={{backgroundColor: '#ececec', color: '#445e6c', fontWeight: '700', fontSize: '13px'}}><RateReviewIcon /> DANH SÁCH NĂM HỌC ĐÀO TẠO</ListSubheader>
                {data.map((value, index) => (
                    <ListItem key={index} className={`item-list ${dataSelect.year == value.id ? 'activeLink' : ''}`} onClick={() => this.props.setDataYearSelect(value.id)}>
                        <ListItemText primary={`Năm học đào tạo [ ${value.startYears} ]`} classes={{ primary: classes.conf }}/>
                        <KeyboardArrowRightIcon />
                    </ListItem>
                ))}
            </List>
        );
    }
}


ListYears.propTypes = {
    classes: PropTypes.object.isRequired,
    dataSelect: PropTypes.object.isRequired,
    setDataYearSelect: PropTypes.func.isRequired
};

ListYears.defaultProps = {
    dataSelect: {year: 0, course: 0},
}

const mapStateToProps = state => ({
    dataSelect: state.selection.select
});

const mapDispatchToProps = {
    setDataYearSelect: selectionOperations.setDataYearSelection
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(ListYears));
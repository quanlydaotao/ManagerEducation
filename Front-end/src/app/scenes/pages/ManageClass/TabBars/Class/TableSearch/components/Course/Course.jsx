import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DvrIcon from '@material-ui/icons/Dvr';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { selectionOperations } from '../../../../../../../../state/ducks/selection';
import { courseOperations } from '../../../../../../../../state/ducks/course';
import { courseShape } from '../../../../../../../propTypes';

import { connect } from 'react-redux';

const style = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        marginTop: 10,
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
        fontWeight: '400',
        color: '#455e6b'
    }
});

class Course extends React.Component {

    componentDidUpdate(prevProps, preState) {
        if (this.props.dataSelect !== prevProps.dataSelect) {
            this.props.getCourses(this.props.dataSelect.year);
        }
    }

    render() {
        const { classes, courses, dataSelect } = this.props;
        return (
            <List className={classes.root} subheader={<li />}>
                <ListSubheader style={{backgroundColor: '#cecece', color: 'white'}}><DvrIcon /> DANH SÁCH KHÓA ĐÀO TẠO</ListSubheader>
                {courses.map((value, index) => (
                    <ListItem key={index} className={`item-list ${dataSelect.course == value.id ? 'activeLink' : ''}`} onClick={() => this.props.setDataCourseSelect(value.id)}>
                        <ListItemText primary={`KHÓA - ${value.name}`} classes={{ primary: classes.conf }}/>
                        <KeyboardArrowRightIcon />
                    </ListItem>
                ))}
            </List>
        );
    }
}


Course.propTypes = {
    classes: PropTypes.object.isRequired,
    dataSelect: PropTypes.object.isRequired,
    course: PropTypes.arrayOf(courseShape).isRequired,
    setDataCourse: PropTypes.func.isRequired
};


Course.defaultProps = {
    dataSelect: {year: 0, course: 0},
    courses: []
}

const mapStateToProps = state => ({
    dataSelect: state.selection.select,
    courses: state.course.allCourses
});

const mapDispatchToProps = {
    setDataCourseSelect: selectionOperations.setDataCourseSelection,
    getCourses: courseOperations.getAllCourseByYearId
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Course));
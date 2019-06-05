import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './styles.css';
import { yearsShape } from '../../../../../propTypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { yearsOperations } from '../../../../../../state/ducks/years';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { SearchYearAndCourse } from '../../../../../components/Search/SearchYearAndCourse';
import DvrIcon from '@material-ui/icons/Dvr';
import RateReviewIcon from '@material-ui/icons/RateReview';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { selectionOperations } from '../../../../../../state/ducks/selection';
import { courseOperations } from '../../../../../../state/ducks/course';
import { courseShape } from '../../../../../propTypes';
import Button from '@material-ui/core/Button';
import { Prompt } from 'react-router-dom';


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
    button: {
        margin: '0',
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

class FormAddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: 0,
            course: 0,
            nameYear: '',
            nameCourse: '',
            isBlocking: true
        }
    }
    componentDidMount() {
        this.props.getAllYears();
    }  

    handleSetYear = (id, name) => {
        this.setState({ year: id, course: 0, nameYear: 'Năm học đào tạo '+ name, nameCourse: ''});
        this.props.getCourses(id);
    }

    handleSetCourse = (id, name) => {
        this.setState({ course: id, nameCourse: 'Khóa ' + name});
        // this.props.getCourses(id);
    } 

    handleSubmit = (event) => {
        event.preventDefault();
        const { year, course } = this.state;
        this.props.getYearAndCourse({year, course});
    } 
    render() {
        const { years, classes, courses } = this.props;
        const { year, course, nameYear, nameCourse, isBlocking } = this.state;
        return (
            <DocumentTitle title='.:Thêm mới lớp học:.'>
                <div className={`${styles.formAddClass}`}>
                    <Prompt 
                        when={isBlocking}
                        message={'Muốn bỏ em à :('} 
                    />
                    <h4 style={{color: '#455e6c'}}>Thêm 1 lớp học mới</h4>
                    <div>
                        <div><b>Chú ý:</b></div>
                        <ul className={`${styles.message}`}>
                            <li>- Các trường thông tin đánh dấu <b>(*)</b> ở dưới là bắt buộc.</li>
                            <li>- Vui lòng chọn <b>năm học</b> và <b>khóa đào tạo</b> phù hợp với lớp học của bạn.</li>
                            <li>- Nếu chưa có năm học hoặc khóa đào tạo, vui lòng thêm năm học và khóa đào tạo trước khi thêm lớp học.</li>
                        </ul>
                    </div>
                    <hr style={{margin: '10px 0 0 0'}}/>
                    <div className={`${styles.contentFormClass} contentForm`}>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className={`row ${styles.wrapSelection}`}>
                                        <div className="col-md-12">
                                            <label htmlFor="name" style={{lineHeight: '50px', display: 'inline-block', marginRight: 20}}><b>Tên lớp học: (*)</b></label>
                                            <input type="text" id="name" style={{display: 'inline-block', width: '100%'}} minLength="5" maxLength="100" onChange={this.handleChange} placeholder="VD: Lớp CT19.8F năm học 2019" name="name" required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className={`${styles.selection}`}>
                                                <div classNamew="row">
                                                    <div className="col-md-6">
                                                        <SearchYearAndCourse />
                                                    </div>
                                                </div>
                                                <div className={`row ${styles.wrapSelection }`}>
                                                    <div className="col-md-6 pr-0">
                                                        <List className={classes.root} subheader={<li />}>
                                                            {years.map((value, index) => (
                                                                <ListItem key={index} className={`item-list ${year == value.id ? 'activeLink' : ''}`} onClick={() => this.handleSetYear(value.id, value.startYears)}>
                                                                    <ListItemText primary={`Năm học đào tạo [ ${value.startYears} ]`} classes={{ primary: classes.conf }}/>
                                                                    <KeyboardArrowRightIcon />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </div>
                                                    <div className="col-md-5 pl-0">
                                                        <List className={classes.root} subheader={<li />}>
                                                            {courses.map((value, index) => (
                                                                <ListItem key={index} className={`item-list ${course == value.id ? 'activeLink' : ''}`} onClick={() => this.handleSetCourse(value.id, value.name)}>
                                                                    <ListItemText primary={`Khóa - ${value.name}`} classes={{ primary: classes.conf }}/>
                                                                    <KeyboardArrowRightIcon />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{margin: '30px 0'}}><b>Bạn đã chọn</b>: <span style={{color: 'orange'}}>{nameYear !== '' ? nameYear : 'Chưa chọn năm học'} {nameCourse !== '' ? `> ${nameCourse}` : ''}</span></div>
                            <br/>
                            <Button type="submit" disabled={year > 0 && course > 0 ? false : true} variant="contained" color="secondary" className={classes.button}>
                                Tiếp theo
                            </Button>
                        </form>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

FormAddCategory.propTypes = {
    classes: PropTypes.object.isRequired,
    years: PropTypes.arrayOf(yearsShape).isRequired,
    getAllYears: PropTypes.func.isRequired,
    course: PropTypes.arrayOf(courseShape).isRequired,
};

FormAddCategory.defaultProps = {
    years: [],
    courses: []
}

const mapStateToProps = state => ({
    years: state.years.allYears,
    courses: state.course.allCourses
});

const mapDispatchToProps = {
    getAllYears: yearsOperations.getAllYears,
    getCourses: courseOperations.getAllCourseByYearId
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(FormAddCategory));

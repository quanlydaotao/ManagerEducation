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
        fontWeight: '400',
        color: '#455e6b'
    }
});

class FormAddClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            year: 0,
            course: 0
        }
    }
    componentDidMount() {
        this.props.getAllYears();
    }  

    handleSetYear = (id) => {
        this.setState({ year: id});
        this.props.getCourses(id);
    }

    handleSetCourse = (id) => {
        this.setState({ course: id});
        // this.props.getCourses(id);
    } 
    render() {
        const { years, classes, courses } = this.props;
        const { year, course } = this.state;
        return (
            <DocumentTitle title='.:Thêm mới lớp học:.'>
                <div className={`${styles.formAddClass}`}>
                    <h4>Thêm 1 lớp học mới</h4>
                    <br />
                    <div>
                        <div><b>Chú ý:</b></div>
                        <ul>
                            <li>- Các trường thông tin đánh dấu <b>(*)</b> ở dưới là bắt buộc.</li>
                            <li>- Mã đăng nhập tối thiểu 7 ký tự trong đó 2 ký tự đầu là mã chức vụ ứng với tài khoản. (<b>Admin</b>: 'ADxxxxx', <b>Giáo viên</b>: 'GVxxxxx', <b>Phụ huynh</b>: 'PHxxxxx' và <b>Học viên</b>: 'HVxxxxx').</li>
                            <li>- Mật khẩu tối thiểu 4 ký tự và tối đa 100 ký tự.</li>
                            <li>- Số điện thoại là số của các nhà mạng ở <b>Việt Nam</b> (số điện thoại bao gồm 10 chữ số).</li>
                            <li>- Với mỗi mã đăng nhập sẽ tương ứng với 1 loại tài khoản. Trong đó, 2 chữ cái đầu tiên của mã đăng nhập sẽ phải trùng với loại tài khoản đã chọn..</li>
                        </ul>
                    </div>
                    <hr />
                    <div className={`${styles.contentFormClass} contentForm`}>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className={`row ${styles.wrapSelection}`}>
                                        <div className="col-md-12">
                                            <label htmlFor="name" style={{lineHeight: '50px', display: 'inline-block', marginRight: 20}}><b>Tên lớp học: (*)</b></label>
                                            <input type="text" id="name" style={{display: 'inline-block', width: '100%'}} maxLength="100" onChange={this.handleChange} placeholder="VD: Lớp CT19.8F năm học 2019" name="name" required />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className={`${styles.selection}`}>
                                                <div classNamew="row">
                                                    <div className="col-md-4">
                                                        <SearchYearAndCourse />
                                                    </div>
                                                </div>
                                                <div className={`row ${styles.wrapSelection }`}>
                                                    <div className="col-md-6 pr-0">
                                                        <List className={classes.root} subheader={<li />}>
                                                            {years.map((value, index) => (
                                                                <ListItem key={index} className={`item-list ${year == value.id ? 'activeLink' : ''}`} onClick={() => this.handleSetYear(value.id)}>
                                                                    <ListItemText primary={`Năm học đào tạo [ ${value.startYears} ]`} classes={{ primary: classes.conf }}/>
                                                                    <KeyboardArrowRightIcon />
                                                                </ListItem>
                                                            ))}
                                                        </List>
                                                    </div>
                                                    <div className="col-md-5 pl-0">
                                                        <List className={classes.root} subheader={<li />}>
                                                            {courses.map((value, index) => (
                                                                <ListItem key={index} className={`item-list ${course == value.id ? 'activeLink' : ''}`} onClick={() => this.handleSetCourse(value.id)}>
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
                        </form>
                    </div>
                </div >
            </DocumentTitle>
        );
    }
}

FormAddClass.propTypes = {
    classes: PropTypes.object.isRequired,
    years: PropTypes.arrayOf(yearsShape).isRequired,
    getAllYears: PropTypes.func.isRequired,
    course: PropTypes.arrayOf(courseShape).isRequired,
};

FormAddClass.defaultProps = {
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


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(FormAddClass));

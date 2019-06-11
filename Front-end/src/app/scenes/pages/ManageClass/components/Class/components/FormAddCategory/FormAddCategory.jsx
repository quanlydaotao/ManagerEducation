import React, { Component, Suspense } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './styles.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {  Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import Button from '@material-ui/core/Button';
import { Prompt } from 'react-router-dom';
import { yearsShape } from '../../../../../../propTypes';
import { SearchYearAndCourse } from '../../../../../../components/Search/SearchYearAndCourse';
import { ListSelection } from '../../../../../../components/ListSelection';
import { coursesShape } from '../../../../../../propTypes';
import { yearsOperations } from '../../../../../../../state/ducks/years';
import { courseOperations } from '../../../../../../../state/ducks/course';
const PopupExitPage = React.lazy(() => import('../../../../../../components/Popup/PopupExitPage/PopupExitPage'));
import { history } from '../../../../../../../state/utils';

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
            idYear: 0,
            nameYear: '',
            idCourse: 0,
            nameCourse: '',
            isBlocking: false,
            nameNewClass: '',
            error: false,
            lastLocation: null,
            open: false
        }
    }
    componentDidMount() {
        this.props.getAllYears(true);
    }  
    selectIdYear = (param) => {
        this.setState({
            idYear: param.id,
            nameYear: param.name,
            idCourse: 0,
            nameCourse: '',
            isBlocking: true
        });
        this.props.getAllCourseByMaxClasses(param.id);
    }  
    selectIdCourse = (param) => {
        this.setState({
            idCourse: param.id,
            nameCourse: param.name,
            isBlocking: true
        });
    }
    handleChange = (event) => {
        this.setState({ nameNewClass: event.target.value, isBlocking: true });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let name = event.target.name.value;
        let year = this.state.idYear;
        let course = this.state.idCourse;
        let { nameYear, nameCourse } = this.state;
        if (this.isSelected()) {
            this.setState({
                error: true
            });
        } else {
            this.props.setYearAndCourse({ name, year, course, nameYear, nameCourse });
        }
        
    }
    isSelected = err => {
        const { nameNewClass,idYear, idCourse, nameYear, nameCourse} = this.state;
        if (nameNewClass === '' || idYear === 0 || idCourse === 0 || nameYear === '' || nameCourse === '') {
            return true;
        }
        return false;
    }

    handleBlockedNavigation = (lastLocation) => {
       this.setState({ open: true, lastLocation });
       return false;
    }

    close = (callback) => this.setState({
               open: false
             }, callback);

    confirm = () => this.close(() => {
       const { lastLocation } = this.state;
       if (lastLocation) {
          this.setState({
             open: false
          }, () => {  
             history.push(lastLocation.pathname);
          })
       }
     });

    render() {
        const { classes, years, courses, when } = this.props;
        const { idYear, idCourse, isBlocking, nameYear, nameCourse, nameNewClass, open, lastLocation } = this.state;
        return (
            <DocumentTitle title='.:Thêm mới lớp học:.'>
                <div className={`${styles.formAddClass}`}>
                    <Prompt 
                        when={isBlocking}
                        message={this.handleBlockedNavigation}
                    />
                    <Suspense fallback={''}>
                        <PopupExitPage isShow={open} handleClose={this.close} handleConfirm={this.confirm} />
                    </Suspense>
                    <h4 className="label-title">Chọn danh mục lớp học</h4>
                    <div>
                        <div><b>Chú ý:</b></div>
                        <ul className="attention">
                            <li>- Các trường thông tin đánh dấu <b>(*)</b> ở dưới là bắt buộc.</li>
                            <li>- Vui lòng chọn <b>năm học</b> và <b>khóa đào tạo</b> phù hợp với lớp học của bạn.</li>
                            <li>- Nếu chưa có năm học hoặc khóa đào tạo, vui lòng thêm năm học và khóa đào tạo trước khi thêm lớp học.</li>
                            <li>- Đối với các khóa học, số lượng lớp học của các khóa nếu đạt số lượng tối đa sẽ không hiển thị ở dưới.</li>
                            <li>- Nếu muốn bổ sung thêm lớp học, vui lòng chỉnh sửa lại số lượng tối đa lớp học của khóa học đó.</li>
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
                                                        <ListSelection 
                                                            data={years} 
                                                            title="DANH SÁCH NĂM HỌC ĐÀO TẠO" 
                                                            getSelectId={this.selectIdYear}
                                                        />
                                                    </div>
                                                    <div className="col-md-5 pl-0">
                                                        <ListSelection 
                                                            data={courses}
                                                            title="DANH SÁCH KHÓA HỌC" 
                                                            getSelectId={this.selectIdCourse}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{margin: '30px 0'}}><b>Bạn đã chọn</b>: <span style={{color: 'orange'}}>{nameYear !== '' ? nameYear : 'Chưa chọn năm học'} {nameCourse !== '' ? `> ${nameCourse}` : ''}</span></div>
                            <br/>
                            <Button type="submit" disabled={idYear > 0 && idCourse > 0 ? false : true} variant="contained" color="secondary" className={classes.button}>
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
    classes: PropTypes.object.isRequied,
    years: PropTypes.arrayOf(yearsShape).isRequired,
    courses: PropTypes.arrayOf(coursesShape).isRequired,
    getAllYears: PropTypes.func.isRequired,
    getAllCourseByYearId: PropTypes.func.isRequired,
};

FormAddCategory.defaultProps = {
    years: [],
    courses: [],
}

const mapStateToProps = state => ({
    years: state.years.list,
    courses: state.course.list,
});

const mapDispatchToProps = {
    getAllYears: yearsOperations.doGetAllYears,
    getAllCourseByMaxClasses: courseOperations.doGetAllCourseByMaxClasses
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(FormAddCategory)));

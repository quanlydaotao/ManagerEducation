import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import styles from './styles.css';
import { yearsShape } from '../../../../../../propTypes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { yearsOperations } from '../../../../../../../state/ducks/years';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { SearchYearAndCourse } from '../../../../../../components/Search/SearchYearAndCourse';
import DvrIcon from '@material-ui/icons/Dvr';
import { ListSelection } from '../../../../../../components/ListSelection';
import RateReviewIcon from '@material-ui/icons/RateReview';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { selectionOperations } from '../../../../../../../state/ducks/selection';
import { courseOperations } from '../../../../../../../state/ducks/course';
import { coursesShape } from '../../../../../../propTypes';
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
            idYear: 0,
            nameYear: '',
            idCourse: 0,
            nameCourse: '',
            course: [],
            class: [],
            isBlocking: false
        }
    }
    componentDidMount() {
        this.props.getAllYears();
    }  
    componentWillUnmount() {
        this.props.getAllCourseByYearId(0);
    }
    selectIdYear = (param) => {
        this.setState({
            idYear: param.id,
            nameYear: param.name
        });
        this.props.getAllCourseByYearId(param.id);
    }  
    selectIdCourse = (param) => {
        this.setState({
            idCourse: param.id,
            nameCourse: param.name
        });
    } 
    render() {
        const { years, courses, classes } = this.props;
        const { idYear, idCourse, isBlocking, nameYear, nameCourse } = this.state;
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
                                                        <ListSelection 
                                                            data={years} 
                                                            title="DANH SÁCH NĂM HỌC ĐÀO TẠO" 
                                                            getSelectId={this.selectIdYear}
                                                        />
                                                    </div>
                                                    <div className="col-md-5 pl-0">
                                                        <List className={classes.root} subheader={<li />}>
                                                            <ListSelection 
                                                                data={courses} 
                                                                title="DANH SÁCH KHÓA HỌC" 
                                                                getSelectId={this.selectIdCourse}
                                                            />
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
    getAllCourseByYearId: courseOperations.doGetAllCourseByYearId,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(FormAddCategory));

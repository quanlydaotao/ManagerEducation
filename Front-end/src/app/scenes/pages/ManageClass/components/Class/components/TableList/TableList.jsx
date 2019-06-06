import React, { Component, Suspense } from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';
import { SearchYearAndCourse } from '../../../../../../components/Search/SearchYearAndCourse';
import { ListSelection } from '../../../../../../components/ListSelection';
import { connect } from 'react-redux';
import { yearsShape } from '../../../../../../propTypes';
import { classShape } from '../../../../../../propTypes';
import { coursesShape } from '../../../../../../propTypes';
import { yearsOperations } from '../../../../../../../state/ducks/years';
import { courseOperations } from '../../../../../../../state/ducks/course';
import { classOperations } from '../../../../../../../state/ducks/class';
const ToolBar = React.lazy(() => import('./components/ToolBar/ToolBar'));
const EnhancedTableClass = React.lazy(() => import('./components/EnhancedTableClass/EnhancedTableClass'));

class TableList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idYear: 0,
            nameYear: '',
            idCourse: 0,
            nameCourse: '',
            course: [],
            class: []
        }
    }
    componentDidMount() {
        this.props.getAllYears();
    }  
    componentWillUnmount() {
        this.props.getAllCourseByYearId(0);
        this.props.getAllClassesByCourseId(0);
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
        this.props.getAllClassesByCourseId(param.id);
    }  
    render() {
        const { years, courses, classes } = this.props;
        const { idYear, idCourse } = this.state;
        return (
            <div className={`${styles.TableSelector}`}>
                <div className={`row ${styles.tbFix}`}>
                    <div className="col-md-12">
                        <ToolBar/>
                        <br />
                    </div>
                    <div className="col-md-12">
                       <div className="row">
                            <div className="col-md-4">
                                <SearchYearAndCourse />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 pr-0">
                        <ListSelection 
                            data={years} 
                            title="DANH SÁCH NĂM HỌC ĐÀO TẠO" 
                            getSelectId={this.selectIdYear}
                        />
                    </div>
                    <div className={`col-md-2 pl-0  ${styles.wrapCourse}`}>
                        <ListSelection 
                            data={courses} 
                            title="DANH SÁCH KHÓA HỌC" 
                            getSelectId={this.selectIdCourse}
                        />
                    </div>
                    <div className="col-md-7">
                        <Suspense fallback={''} >
                            <EnhancedTableClass data={classes} listName="DANH SÁCH LỚP HỌC ĐÀO TẠO CỦA ALOHA" />
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }
}

TableList.propTypes = {
    years: PropTypes.arrayOf(yearsShape).isRequired,
    courses: PropTypes.arrayOf(coursesShape).isRequired,
    classes: PropTypes.arrayOf(classShape).isRequired,
    getAllYears: PropTypes.func.isRequired,
    getAllCourseByYearId: PropTypes.func.isRequired,
    getAllClassesByCourseId: PropTypes.func.isRequired
};

TableList.defaultProps = {
    years: [],
    courses: [],
    classes: []
}

const mapStateToProps = state => ({
    years: state.years.list,
    courses: state.course.list,
    classes: state.class.list
});

const mapDispatchToProps = {
    getAllYears: yearsOperations.doGetAllYears,
    getAllCourseByYearId: courseOperations.doGetAllCourseByYearId,
    getAllClassesByCourseId: classOperations.doGetClassesByCourseId,

};


export default connect(mapStateToProps, mapDispatchToProps)(TableList);

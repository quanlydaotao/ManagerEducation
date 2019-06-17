import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
const SectionClassRoom = React.lazy(() => import('./components/SectionClassRoom/SectionClassRoom'));
import PropTypes from 'prop-types';
import { yearsOperations } from '../../../../../state/ducks/years';
import { courseOperations } from '../../../../../state/ducks/course';
import { classOperations } from '../../../../../state/ducks/class';
import { coursesShape } from '../../../../propTypes';
import DocumentTitle from 'react-document-title';
import { classShape } from '../../../../propTypes';

class Statistical extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.selectYear !== prevProps.selectYear) {
            this.props.findById(this.props.selectYear);
            this.props.findClassByCourseId(this.props.selectCourse);
        }
    }
    render() {
        const { detailYear, listClass } = this.props;
        return (
            <DocumentTitle title=".:Quản lý đào tạo - Thống kê dữ liệu:.">
                <div>
                    <Suspense fallback=''>
                        <SectionClassRoom year={detailYear} clas={listClass}/>
                    </Suspense>
                </div>
            </DocumentTitle>
        )
    }
}

Statistical.propTypes = {
    detailYear: PropTypes.object.isRequired,
    selectYear: PropTypes.number.isRequired,
    selectCourse: PropTypes.number.isRequired,
    listCourse: PropTypes.arrayOf(coursesShape).isRequired,
    listClass: PropTypes.arrayOf(classShape).isRequired,
    findById: PropTypes.func.isRequired,
    findCourseByYearId: PropTypes.func.isRequired,
    findClassByCourseId: PropTypes.func.isRequired
}

Statistical.defaultProps = {
    selectYear: 0,
    selectCourse: 0,
    detail: {},
    listCourse: [],
    listClass: []
}

const mapStateToProps = state => ({
    detailYear: state.years.detail,
    selectYear: state.years.select,
    selectCourse: state.course.select,
    listCourse: state.course.list,
    listClass: state.class.list
});

const mapDispatchToProps = {
    findById: yearsOperations.doGetYearById,
    findCourseByYearId: courseOperations.doGetAllCourseByYearId,
    findClassByCourseId: classOperations.doGetClassesByCourseId
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistical);

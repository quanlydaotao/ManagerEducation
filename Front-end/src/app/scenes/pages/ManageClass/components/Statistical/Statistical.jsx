import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
const SectionClassRoom = React.lazy(() => import('./components/SectionClassRoom/SectionClassRoom'));
import PropTypes from 'prop-types';
import { yearsOperations } from '../../../../../state/ducks/years';
import { courseOperations } from '../../../../../state/ducks/course';
import { coursesShape } from '../../../../propTypes';
import { classShape } from '../../../../propTypes';

class Statistical extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.select !== prevProps.select) {
            this.props.findById(this.props.select);
            this.props.findCourseByYearId(this.props.select);
        }
    }
    render() {
        const { detailYear, listCourse } = this.props;
        return (
            <div>
                <Suspense fallback=''>
                    <SectionClassRoom year={detailYear} course={listCourse}/>
                </Suspense>
            </div>
        )
    }
}

Statistical.propTypes = {
    detailYear: PropTypes.object.isRequired,
    listCourse: PropTypes.arrayOf(coursesShape).isRequired,
    findById: PropTypes.func.isRequired,
    findCourseByYearId: PropTypes.func.isRequired,
}

Statistical.defaultProps = {
    detail: {},
    listCourse: []
}

const mapStateToProps = state => ({
    detailYear: state.years.detail,
    select: state.years.select,
    listCourse: state.course.list
});

const mapDispatchToProps = {
    findById: yearsOperations.doGetYearById,
    findCourseByYearId: courseOperations.doGetAllCourseByYearId
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistical);

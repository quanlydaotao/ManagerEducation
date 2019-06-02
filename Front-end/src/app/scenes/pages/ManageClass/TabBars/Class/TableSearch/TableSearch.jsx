import React, { Component, Suspense } from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';
import { Search } from './components/Search';
import { ListYears } from './components/ListYears';
import { Course } from './components/Course';
import { connect } from 'react-redux';
import { yearsShape } from '../../../../../propTypes';
import { yearsOperations } from '../../../../../../state/ducks/years';
const ToolBar = React.lazy(() => import('./components/ToolBar/ToolBar'));
const EnhancedTableClass = React.lazy(() => import('./components/EnhancedTableClass/EnhancedTableClass'));


class TableSearch extends Component {
    render() {
        const { dataSelect } = this.props;
        return (
            <div className={`${styles.TableSelector}`}>
                <div className={`row ${styles.tbFix}`}>
                    <div className="col-md-12">
                        <ToolBar />
                        <br />
                    </div>
                    <div className="col-md-12">
                       <div className="row">
                            <div className="col-md-4">
                                <Search />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 pr-0">
                        <ListYears data={this.props.years}/>
                    </div>
                    <div className={`col-md-2 pl-0 ${styles.wrapCourse}`}>
                        <Course />
                    </div>
                    <div className="col-md-8">
                        <Suspense fallback={''} >
                            <EnhancedTableClass listName="DANH SÁCH LỚP HỌC" />
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }
}

TableSearch.propTypes = {
    years: PropTypes.arrayOf(yearsShape).isRequired,
};

TableSearch.defaultProps = {
    years: [],
}

const mapStateToProps = state => ({
    years: state.years.allYears,
});

export default connect(mapStateToProps, null)(TableSearch);

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
const FormAddClass = React.lazy(() => import('./components/FormAddClass/FormAddClass'));


class TableSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    componentDidMount() {
        this.props.getAllYears();
    }       
    handleAddNew = (param) => {
        this.setState({ open: true });
    }
    render() {
        const { dataSelect } = this.props;
        const { open } = this.state;
        return (
            <div className={`${styles.TableSelector}`}>
                <div className={`row ${styles.tbFix}`}>
                    <div className="col-md-12">
                        <ToolBar handleAddNew={this.handleAddNew}/>
                        <br />
                    </div>
                    <div className="col-md-12">
                       <div className="row">
                            <div className="col-md-4">
                                <Search />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 pr-0">
                        <ListYears data={this.props.years}/>
                    </div>
                    <div className={`col-md-2 pl-0 ${styles.wrapCourse}`}>
                        <Course />
                    </div>
                    <div className="col-md-7">
                        <Suspense fallback={''} >
                            { open ? <FormAddClass /> : <EnhancedTableClass listName="DANH SÁCH LỚP HỌC ĐÀO TẠO CỦA ALOHA" /> }
                        </Suspense>
                    </div>
                </div>
            </div>
        )
    }
}

TableSearch.propTypes = {
    years: PropTypes.arrayOf(yearsShape).isRequired,
    getAllYears: PropTypes.func.isRequired
};

TableSearch.defaultProps = {
    years: [],
}

const mapStateToProps = state => ({
    years: state.years.allYears,
});

const mapDispatchToProps = {
    getAllYears: yearsOperations.getAllYears,
};


export default connect(mapStateToProps, mapDispatchToProps)(TableSearch);

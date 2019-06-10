import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { classShape } from '../../../../../../../../propTypes';
import { classOperations } from '../../../../../../../../../state/ducks/class';
import { popupOperations } from '../../../../../../../../../state/ducks/popup';
import { toggleOperations } from '../../../../../../../../../state/ducks/toggle';
import { EnhancedTableHead } from '../../../../../../../../components/Table/EnhancedTableHead';
import { EnhancedTableToolBar } from '../../../../../../../../components/Table/EnhancedTableToolBar';
import DocumentTitle from 'react-document-title';
import Skeleton from 'react-loading-skeleton';
import LazyLoad from 'react-lazyload';
import styles from './styles.css';
import { PopupDelete } from '../../../../../../../../components/Popup/PopupDelete';
import { history } from '../../../../../../../../../state/utils';
import { ButtonEdit } from '../../../../../../../../components/Buttons/ButtonEdit';
const NotFoundSearch = React.lazy(() => import('../../../../../../../../components/NotFoundSearch/NotFoundSearch'));

const rows = [
    { id: 'classCode', numeric: false, disablePadding: false, label: 'Mã lớp' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Tên lớp' },
    { id: 'classRoom', numeric: false, disablePadding: false, label: 'Phòng học' },
    { id: 'describe', numeric: false, disablePadding: false, label: 'Mô tả' },
    { id: 'openDay', numeric: false, disablePadding: false, label: 'Ngày mở lớp' },
    { id: 'closeDay', numeric: false, disablePadding: false, label: 'Ngày đóng lớp' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Trạng thái' },
    { id: 'edit', numeric: false, disablePadding: false, label: 'Tác vụ' }
]

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const style = theme => ({
    root: {
        width: '100%',
        borderRadius: '2px',
        boxShadow: 'none',
        margin: 0
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    chip: {
        margin: theme.spacing.unit,
        backgroundColor: '#455e6b'
    },
});

class EnhancedTableClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 5
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((this.props.dataSelect !== prevProps.dataSelect) && (this.props.dataSelect.course > 0)) {
            const { dataSelect } = this.props;
            this.props.getAllClassByCourseId(dataSelect.course);
        }
    }


    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState({ selected: this.props.listClass.map(n => n.id) });
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleOpenForm = (id) => {
        this.props.findClassById(id);
        this.props.openForm();
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };


    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    // handleDelete = (param) => {
    //     this.props.openPopupDelete();
    // }

    // deleteData = (param) => {
    //     this.props.deleteYears(this.state.selected);
    // }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes, listName, data, classById, status } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        console.log(classById);
        // if (actionsYears && actionsYears.status === 'DELETE_SUCCESS' && actionsYears.data === selected.length) {
        //     alert("Xóa thành công " + actionsYears.data + " trường dữ liệu năm học!");
        //     history.push('/administrator/education/years');
        // } else if (actionsYears && actionsYears.status === 'DELETE_FAILED' && actionsYears.data !== selected.length) {
        //     alert("Xóa dữ liệu năm học thất bại!");
        // }
        return (
            <React.Fragment>
                <DocumentTitle title=".:Hệ thống lớp học:.">
                    {data.length > 0 ? (
                        <Paper className={classes.root}>
                            {/*<PopupDelete delete={this.deleteData} /> */}
                            <EnhancedTableToolBar numSelected={selected.length} listName={listName} actionDelete={this.handleDelete} />
                            <div className={classes.tableWrapper}>
                                <Table className={classes.table} aria-labelledby="tableTitle">
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectAllClick={this.handleSelectAllClick}
                                        onRequestSort={this.handleRequestSort}
                                        rowCount={data.length}
                                        rows={rows}
                                    />
                                    <TableBody>
                                        {stableSort(data, getSorting(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(n => {
                                                const isSelected = this.isSelected(n.id);
                                                return (
                                                    <LazyLoad>
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            aria-checked={isSelected}
                                                            tabIndex={-1}
                                                            key={n.id}
                                                            selected={isSelected}
                                                        >
                                                            <TableCell padding="checkbox" onClick={event => this.handleClick(event, n.id)}>
                                                                <Checkbox checked={isSelected} color="default" />
                                                            </TableCell>
                                                            <TableCell className="cell">
                                                                <b>{n.classCode || <Skeleton />}</b>
                                                            </TableCell>
                                                            <TableCell className="cell">
                                                                <b>{n.name || <Skeleton />}</b>
                                                            </TableCell>
                                                            <TableCell className="cell">
                                                                {<Chip
                                                                    label={<b>{n.classRoom}</b>}
                                                                    color="inherit"
                                                                    title={<b>{n.classRoom}</b>}
                                                                /> || <Skeleton />}
                                                            </TableCell>
                                                            <TableCell className="cell">
                                                                {n.describe || <Skeleton />}
                                                            </TableCell>
                                                            <TableCell className="cell">
                                                                {n.openDay || <Skeleton />}
                                                            </TableCell>
                                                            <TableCell className="cell">
                                                                {n.closeDay || <Skeleton />}
                                                            </TableCell>
                                                            <TableCell className="cell">
                                                                {(n.status ? <Chip
                                                                    icon={<CheckCircleIcon />}
                                                                    label="Mở lớp"
                                                                    color="primary"
                                                                    className={classes.chip}
                                                                    title="Mở lớp"
                                                                /> : <Chip
                                                                        icon={<RemoveCircleIcon />}
                                                                        label="Đóng lớp"
                                                                        color="inherit"
                                                                        title="Đóng lớp"
                                                                    />) || <Skeleton />}
                                                            </TableCell>
                                                            <TableCell className="cell">
                                                                <ButtonEdit title="Chỉnh sửa thông tin lớp học" to={`/admin/edu/classes/${n.id}`} />
                                                            </TableCell>
                                                        </TableRow>
                                                    </LazyLoad>
                                                );
                                            })}
                                        {data.length <= 0 && (
                                            <TableRow>
                                                <TableCell colSpan={8}>
                                                    <Skeleton count={5} height={50} duration={2} />
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 15, 25, 50, 75, 100]}
                                component="div"
                                count={data.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                    'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                    'aria-label': 'Next Page',
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            />
                        </Paper>
                    ) : (
                            <NotFoundSearch name="Không tìm thấy danh sách lớp học." />
                        )}
                </DocumentTitle>
            </React.Fragment>
        );
    }
}

EnhancedTableClass.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.arrayOf(classShape).isRequired,
    classById: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired,
    findClassById: PropTypes.func.isRequired,
    openForm: PropTypes.func.isRequired
};

EnhancedTableClass.defaultProps = {
    data: {},
    classById: {}
}

const mapStateToProps = state => ({
    classById: state.class.detail,
});

const mapDispatchToProps = {
    findClassById: classOperations.doGetClassById,
    openForm: toggleOperations.doOpenFormEditClass,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EnhancedTableClass)));
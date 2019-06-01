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
import { connect } from 'react-redux';
import { yearsShape } from '../../../../../propTypes';
import { yearsOperations } from '../../../../../../state/ducks/years';
import { popupOperations } from '../../../../../../state/ducks/popup';
import { EnhancedTableHead } from '../../../../../components/Table/EnhancedTableHead';
import { EnhancedTableToolBar } from './components/EnhancedTableToolBar';
import { ImageAvatars } from '../../../../../components/ImageAvatars';
import Skeleton from 'react-loading-skeleton';
import LazyLoad from 'react-lazyload';
import styles from './styles.css';
import { PopupFormEditYear } from '../../../../../components/Popup/PopupFormEditYear';
import { PopupDelete } from '../../../../../components/Popup/PopupDelete';
import { history } from '../../../../../../state/utils';
const NotFoundSearch = React.lazy(() => import('../../../../../components/NotFoundSearch/NotFoundSearch'));

const rows = [
    { id: 'id', numeric: false, disablePadding: false, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Tên năm học' },
    { id: 'startYears', numeric: false, disablePadding: false, label: 'Năm học' },
    { id: 'openDay', numeric: false, disablePadding: false, label: 'Ngày khai giảng' },
    { id: 'closeDay', numeric: false, disablePadding: false, label: 'Ngày bế giảng' },
    { id: 'maximumClasses', numeric: false, disablePadding: false, label: 'Số khóa học tối đa' },
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
        boxShadow: '0 2px 4px 0 rgba(0,0,0,.05)',
        padding: '0 24px',
        borderRadius: '2px'
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

class EnhancedTableYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: 10
        }
    }

    componentDidMount() {
        this.props.getAllYears();
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
            this.setState({ selected: this.props.years.map(n => n.id) });
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
        this.props.findYearById(id);
        this.props.openForm();
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };


    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleDelete = (param) => {
        this.props.openPopupDelete();
    }

    deleteData = (param) => {
        this.props.deleteYears(this.state.selected);
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes, listName, years, yearById, actionsYears } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        if (actionsYears && actionsYears.status === 'DELETE_SUCCESS' && actionsYears.data === selected.length) {
            alert("Xóa thành công " + actionsYears.data + " trường dữ liệu năm học!");
            history.push('/administrator/education/years');
        } else if (actionsYears && actionsYears.status === 'DELETE_FAILED' && actionsYears.data !== selected.length) {
            alert("Xóa dữ liệu năm học thất bại!");
        }
        return (
            <React.Fragment>
                { years.length > 0 ? (
                    <Paper className={classes.root}>
                        {yearById.id ? <PopupFormEditYear data={yearById} /> : ''} 
                        <PopupDelete delete={this.deleteData} />
                        <EnhancedTableToolBar numSelected={selected.length} listName={listName} actionDelete={this.handleDelete} />
                        <div style={{ padding: '10px 0 15px 24px' }} className="message">
                            <div>
                                <b>Chú ý:</b>
                            </div>
                            <ul>
                                <li>- Danh sách dưới bao gồm các năm học trong chương trình đào tạo.</li>
                                <li>- Mỗi năm học sẽ có các lớp được mở tương ứng.</li>
                                <li>- Khi kết thúc năm học bạn có thể đóng năm học đó lại thay vì xóa.</li>
                                <li>- Trong trường hợp muốn xóa năm học, bạn hãy chắc chắn rằng muốn xóa tất cả dữ liệu trong năm học và không thể khôi phục.</li>
                            </ul>
                        </div>
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table} aria-labelledby="tableTitle">
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={this.handleSelectAllClick}
                                    onRequestSort={this.handleRequestSort}
                                    rowCount={years.length}
                                    rows={rows}
                                />
                                <TableBody>
                                    {stableSort(years, getSorting(order, orderBy))
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
                                                            <b>{n.id || <Skeleton />}</b>
                                                        </TableCell>
                                                        <TableCell className="cell">
                                                            {n.name || <Skeleton />}
                                                        </TableCell>
                                                        <TableCell className="cell">
                                                            {<Chip
                                                                label={<b>{n.startYears}</b>}
                                                                color="inherit"
                                                                title={<b>{n.startYears}</b>}
                                                            /> || <Skeleton />}
                                                        </TableCell>
                                                        <TableCell className="cell">
                                                            {n.openDay || <Skeleton />}
                                                        </TableCell>
                                                        <TableCell className="cell">
                                                            {n.closeDay || <Skeleton />}
                                                        </TableCell>
                                                        <TableCell className="cell">
                                                            {n.maximumClasses || <Skeleton />}
                                                        </TableCell>
                                                        <TableCell className="cell">
                                                            {(n.status ? <Chip
                                                                icon={<CheckCircleIcon />}
                                                                label="Mở năm học"
                                                                color="primary"
                                                                className={classes.chip}
                                                                title="Mở năm học"
                                                            /> : <Chip
                                                                    icon={<RemoveCircleIcon />}
                                                                    label="Đóng năm học"
                                                                    color="inherit"
                                                                    title="Đóng năm học"
                                                            />) || <Skeleton />}
                                                        </TableCell>
                                                        <TableCell className="cell">
                                                            {<Button className="btn" onClick={() => this.handleOpenForm(n.id)} variant="contained" style={{ backgroundColor: '#17b304', color: '#fff', minWidth: 0, padding: '5px' }}
                                                                title="Chỉnh sửa thông tin tài khoản">
                                                                <LaunchIcon />
                                                            </Button> || <Skeleton />}
                                                        </TableCell>
                                                    </TableRow>
                                                </LazyLoad>
                                            );
                                        })}
                                    {years.length <= 0 && (
                                        <TableRow>
                                            <TableCell colSpan={9}>
                                                <Skeleton count={10} height={50} duration={2} />
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[10, 15, 25, 50, 75, 100]}
                            component="div"
                            count={years.length}
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
                    <NotFoundSearch name="Không tìm thấy danh sách năm học."/>
                )}
            </React.Fragment>
        );
    }
}

EnhancedTableYear.propTypes = {
    classes: PropTypes.object.isRequired,
    years: PropTypes.arrayOf(yearsShape).isRequired,
    actionsYears: PropTypes.object.isRequired,
    yearById: PropTypes.object.isRequired,
    getAllYears: PropTypes.func.isRequired,
    toggleEditYears: PropTypes.func.isRequired,
    deleteYears: PropTypes.func.isRequired,
    deleteUserAccount: PropTypes.func.isRequired,
    findYearById: PropTypes.func.isRequired,
};

EnhancedTableYear.defaultProps = {
    years: [],
    yearById: {},
    actionsYears: {}
}

const mapStateToProps = state => ({
    years: state.years.allYears,
    yearById: state.years.getYear,
    actionsYears: state.years.actionsYears
});

const mapDispatchToProps = {
    getAllYears: yearsOperations.getAllYears,
    openForm: yearsOperations.openFormEdit,
    openPopupDelete: popupOperations.openPopupDelete,
    findYearById: yearsOperations.getYearsById,
    deleteYears: yearsOperations.deleteYears
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EnhancedTableYear));
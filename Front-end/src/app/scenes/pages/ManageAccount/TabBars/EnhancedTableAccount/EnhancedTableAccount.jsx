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
import styles from './styles.css';
import { connect } from 'react-redux';
import noavatar from './images/no_avatar.jpg';
import { accountShape } from '../../../../propTypes';
import { accountOperations } from '../../../../../state/ducks/account';
import { popupOperations } from '../../../../../state/ducks/popup';
import { EnhancedTableHead } from '../../../../components/Table/EnhancedTableHead';
import { EnhancedTableToolBar } from './components/EnhancedTableToolBar';
import { ImageAvatars } from '../../../../components/ImageAvatars';
import Skeleton from 'react-loading-skeleton';
import LazyLoad from 'react-lazyload';
import { PopupFormEdit } from '../../../../components/Popup/PopupFormEdit';
import { PopupDelete } from '../../../../components/Popup/PopupDelete';

const rows = [
    { id: 'imageUrl', numeric: false, disablePadding: false, label: 'Avatar' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'Họ' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Tên' },
    { id: 'login', numeric: false, disablePadding: false, label: 'Mã đăng nhập' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone_number', numeric: false, disablePadding: false, label: 'Số điện thoại' },
    { id: 'authorities', numeric: false, disablePadding: false, label: 'Loại tài khoản' },
    { id: 'activated', numeric: false, disablePadding: false, label: 'Trạng thái' },
    { id: 'dateSigned', numeric: false, disablePadding: false, label: 'Ngày đăng ký' },
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
        marginTop: theme.spacing.unit * 3,
        boxShadow: 'none',
        padding: '0 24px'
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

class EnhancedTableAccount extends React.Component {
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
        this.props.getAllUserAccount();
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
            this.setState({ selected: this.props.accounts.map(n => n.id) });
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

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleOpenForm = (id) => {
        this.props.findAccountById(id);
        this.props.openForm();
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleDelete = (param) => {
        this.props.openPopupDelete();
    }

    deleteData = (param) => {
        this.props.deleteUserAccount(this.state.selected);
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes, listName, accounts, accountById } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        return (
            <Paper className={classes.root}>
                {accountById.id ? <PopupFormEdit data={accountById}/> : ''}
                <PopupDelete delete={this.deleteData} />
                <EnhancedTableToolBar numSelected={selected.length} listName={listName} actionDelete={this.handleDelete}/>
                <div style={{padding: '10px 0 15px 24px'}} className="message">
                    <div>
                        <b>Chú ý:</b>
                    </div>
                    <ul>
                        <li>- Danh sách dưới bao gồm tất cả các tài khoản đăng nhập vào hệ thống quản lý đào tạo.</li>
                        <li>- Tương ứng với mỗi tài khoản, chỉ hiển thị các thông tin cơ bản của các tài khoản đó.</li>
                        <li>- Khi muốn thay đổi các thông tin hoặc xóa tài khoản, hãy chắc chắn rằng bạn muốn thực hiện điều đó và tất cả dữ liệu sẽ không thể khôi phục.</li>
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
                            rowCount={accounts.length}
                            rows={rows}
                        />
                        <TableBody>
                            {stableSort(accounts, getSorting(order, orderBy))
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
                                                    <LazyLoad height={40}>
                                                        <ImageAvatars url={n.imageUrl !== '' ? `http://localhost:8080/api/file/avatar/${n.imageUrl}` : noavatar} />
                                                    </LazyLoad>
                                                </TableCell>
                                                <TableCell className="cell">
                                                    <b>{n.firstName || <Skeleton />}</b>
                                                </TableCell>
                                                <TableCell className="cell">
                                                    <b>{n.lastName || <Skeleton />}</b>
                                                </TableCell>
                                                <TableCell className="cell">
                                                    {n.login || <Skeleton />}
                                                </TableCell>
                                                <TableCell className="cell">
                                                    {n.email || <Skeleton />}
                                                </TableCell>
                                                <TableCell className="cell">
                                                    {n.phoneNumber || <Skeleton />}
                                                </TableCell>
                                                <TableCell className="cell">
                                                    {n.authorities.toString() === '' ? (<Skeleton />) : `
                                                    ${n.authorities.toString() === 'ROLE_ADMIN' ? 'ADMIN' : ''}
                                                    ${n.authorities.toString() === 'ROLE_TEACHER' ? 'GIẢNG VIÊN' : ''}
                                                    ${n.authorities.toString() === 'ROLE_PARENTS' ? 'PHỤ HUYNH' : ''}
                                                    ${n.authorities.toString() === 'ROLE_STUDENT' ? 'HỌC VIÊN' : ''}
                                                `}
                                                </TableCell>
                                                <TableCell className="cell">
                                                    {n.activated ? <Chip
                                                        icon={<CheckCircleIcon />}
                                                        label="Đã kích hoạt"
                                                        color="primary"
                                                        className={classes.chip}
                                                        title="Đã kích hoạt"
                                                    /> : <Chip
                                                            icon={<RemoveCircleIcon />}
                                                            label="Chưa kích hoạt"
                                                            color="inherit"
                                                            title="Chưa kích hoạt"
                                                        />}
                                                </TableCell>
                                                <TableCell className="cell">
                                                    {n.dateSigned || <Skeleton />}
                                                </TableCell>
                                                <TableCell className="cell">
                                                    <Button className="btn" onClick={() => this.handleOpenForm(n.id)} variant="contained" style={{ backgroundColor: '#17b304', color: '#fff', minWidth: 0, padding: '5px' }} 
                                                            title="Chỉnh sửa thông tin tài khoản">
                                                        <LaunchIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        </LazyLoad>
                                    );
                                })}
                            {accounts.length <= 0 && (
                                <TableRow>
                                    <TableCell colSpan={11}>
                                        <Skeleton count={10} height={60} duration={2} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 25, 50, 75, 100]}
                    component="div"
                    count={accounts.length}
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
        );
    }
}

EnhancedTableAccount.propTypes = {
    classes: PropTypes.object.isRequired,
    listName: PropTypes.string.isRequired,
    accounts: PropTypes.arrayOf(accountShape).isRequired,
    getAllUserAccount: PropTypes.func.isRequired,
    openForm: PropTypes.func.isRequired,
    findAccountById: PropTypes.func.isRequired,
    deleteUserAccount: PropTypes.func.isRequired
};

EnhancedTableAccount.defaultProps = {
    accounts: []
}

const mapStateToProps = state => ({
    accounts: state.account.accounts,
    accountById: state.account.getAccounts
});

const mapDispatchToProps = {
    getAllUserAccount: accountOperations.getAllUserAccount,
    openForm: accountOperations.openFormEdit,
    findAccountById: accountOperations.getUserAccountById,
    deleteUserAccount: accountOperations.deleteUserAccount,
    openPopupDelete: popupOperations.openPopupDelete
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EnhancedTableAccount));
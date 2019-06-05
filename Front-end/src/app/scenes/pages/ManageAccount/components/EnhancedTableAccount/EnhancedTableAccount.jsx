import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import DocumentTitle from 'react-document-title';
import { connect } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import LazyLoad from 'react-lazyload';
import noavatar from './images/no_avatar.jpg';
import { accountShape } from '../../../../propTypes';
import { accountOperations } from '../../../../../state/ducks/account';
import { popupOperations } from '../../../../../state/ducks/popup';
import { toggleOperations } from '../../../../../state/ducks/toggle';
import { EnhancedTableHead } from '../../../../components/Table/EnhancedTableHead';
import { EnhancedTableToolBar } from '../../../../components/Table/EnhancedTableToolBar';
import { PopupFormEditAccount } from '../../../../components/Popup/PopupFormEditAccount';
import { PopupDelete } from '../../../../components/Popup/PopupDelete';
import { history } from '../../../../../state/utils';
import { ImageAvatars } from '../../../../components/ImageAvatars';
import { ButtonEdit } from '../../../../components/Buttons/ButtonEdit';
const NotFoundSearch = React.lazy(() => import('../../../../components/NotFoundSearch/NotFoundSearch'));
const rows = [
    { id: 'imageUrl', numeric: false, disablePadding: false, label: 'Avatar' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'Họ' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Tên' },
    { id: 'login', numeric: false, disablePadding: false, label: 'Mã đăng nhập' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone_number', numeric: false, disablePadding: false, label: 'Số điện thoại' },
    { id: 'authorities', numeric: false, disablePadding: false, label: 'Loại tài khoản' },
    { id: 'activated', numeric: false, disablePadding: false, label: 'Trạng thái' },
    { id: 'dateSigned', numeric: false, disablePadding: false, label: 'Thời gian đăng ký' },
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
        boxShadow: '0 2px 4px 0 rgba(0,0,0,.05)',
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
        this.props.openFormEdit();
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleDelete = (param) => {
        this.props.openPopupDelete();
    }

    deleteData = (param) => {
        this.props.deleteAccountByIds(this.state.selected);
    }

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes, listName, accounts, detail, status } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        if (
            status
            && status.status === 'DELETE_SUCCESS'
            && status.data === selected.length) {
            alert("Xóa thành công " + status.data + " trường dữ liệu tài khoản!");
            history.push('/admin/account/list/all'
            );
        } else if (
            status
            && status.status === 'DELETE_FAILED'
            && status.data !== selected.length) {
            alert("Xóa dữ liệu tài khoản thất bại!"
            );
        }
        return (
            <React.Fragment>
                <DocumentTitle title=".:Danh sách tài khoản:.">
                    {accounts.length > 0 ? (
                        <Paper className={classes.root}>
                            {detail.id ? <PopupFormEditAccount data={detail} /> : ''}
                            <PopupDelete delete={this.deleteData} />
                            <EnhancedTableToolBar
                                numSelected={selected.length}
                                listName={listName}
                                actionDelete={this.handleDelete}
                            />
                            <div style={{ padding: '10px 0 15px 24px' }} className="message">
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
                                                                <ImageAvatars
                                                                    src={n.imageUrl !== '' ? `http://localhost:8080/api/file/avatar/${n.imageUrl}` : noavatar}
                                                                    title={`${n.firstName} ${n.lastName}`}
                                                                />
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
                                                            <ButtonEdit title="Chỉnh sửa thông tin tài khoản" id={n.id} handleOpenForm={this.handleOpenForm} />
                                                        </TableCell>
                                                    </TableRow>
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
                    ) : (
                            <NotFoundSearch name="Không tìm thấy danh sách tài khoản." />
                        )}
                </DocumentTitle>
            </React.Fragment>
        );
    }
}

EnhancedTableAccount.propTypes = {
    classes: PropTypes.object.isRequired,
    accounts: PropTypes.arrayOf(accountShape).isRequired,
    detail: PropTypes.objectOf(accountShape).isRequired,
    status: PropTypes.objectOf({
        progress: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }).isRequired,
    listName: PropTypes.string.isRequired,

    getAllUserAccount: PropTypes.func.isRequired,
    findAccountById: PropTypes.func.isRequired,
    deleteAccountByIds: PropTypes.func.isRequired,
    openFormEdit: PropTypes.func.isRequired,
    openPopupDelete: PropTypes.func.isRequired
};

EnhancedTableAccount.defaultProps = {
    accounts: [],
    detail: {},
    status: { progress: false, status: '', data: {} }
}

const mapStateToProps = state => ({
    accounts: state.account.list,
    detail: state.account.detail,
    status: state.account.status
});

const mapDispatchToProps = {
    getAllUserAccount: accountOperations.doGetAllAccounts,
    findAccountById: accountOperations.doGetAccountById,
    deleteAccountByIds: accountOperations.doDeleteAccountByIds,
    openFormEdit: toggleOperations.doOpenFormEditAccount,
    openPopupDelete: popupOperations.doOpenPopupDelete
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EnhancedTableAccount));
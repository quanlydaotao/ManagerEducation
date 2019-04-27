import React from 'react';
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
import { connect } from 'react-redux';
import { accountShape } from '../../../../../propTypes';
import { accountOperations } from '../../../../../../state/ducks/account';
import { EnhancedTableHead } from '../../../../../components/EnhancedTableHead';
import { EnhancedTableToolBar } from '../../../../../components/EnhancedTableToolBar';
import { ImageAvatars } from '../../../../../components/ImageAvatars';

const rows = [
    { id: 'imageUrl', numeric: false, disablePadding: false, label: 'Avatar' },
    { id: 'firstName', numeric: false, disablePadding: false, label: 'Họ' },
    { id: 'lastName', numeric: false, disablePadding: false, label: 'Tên' },
    { id: 'login', numeric: false, disablePadding: false, label: 'Mã đăng nhập' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'phone_number', numeric: false, disablePadding: false, label: 'Số điện thoại' },
    { id: 'authorities', numeric: false, disablePadding: false, label: 'Loại tài khoản' },
    { id: 'activated', numeric: false, disablePadding: false, label: 'Trạng thái' }
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
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    chip: {
        margin: theme.spacing.unit,
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
            rowsPerPage: 5
        }
    }

    componentDidMount() {
        const { accounts } = this.props;
        if (accounts.length === 0) {
            this.props.getAllUserAccount();
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

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes, listName, accounts } = this.props;
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, accounts.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolBar numSelected={selected.length} listName={listName} />
                <hr className="tall" />
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
                                            <TableCell padding="default">
                                                <ImageAvatars url={n.imageUrl}/>
                                            </TableCell>
                                            <TableCell padding="default">
                                                <b>{n.firstName}</b>
                                            </TableCell>
                                            <TableCell padding="default">
                                                <b>{n.lastName}</b>
                                            </TableCell>
                                            <TableCell padding="default">
                                                {n.login}
                                            </TableCell>
                                            <TableCell padding="default">
                                                {n.email}
                                            </TableCell>
                                            <TableCell padding="default">
                                                {n.phone_number}
                                            </TableCell>
                                            <TableCell padding="default">
                                                { n.authorities.toString() === 'ROLE_ADMIN' ? 'ADMIN' : '' }
                                                { n.authorities.toString() === 'ROLE_TEACHER' ? 'GIẢNG VIÊN' : '' }
                                                { n.authorities.toString() === 'ROLE_PARENTS' ? 'PHỤ HUYNH' : '' }
                                                { n.authorities.toString() === 'ROLE_STUDENT' ? 'HỌC VIÊN' : '' }
                                            </TableCell>
                                            <TableCell padding="default">
                                                { n.activated ? <Chip
                                                                    icon={<CheckCircleIcon />}
                                                                    label="Đã kích hoạt"
                                                                    className={classes.chip}
                                                                    color="primary"
                                                                /> : <Chip
                                                                        icon={<RemoveCircleIcon />}
                                                                        label="Chưa kích hoạt"
                                                                        className={classes.chip}
                                                                        color="secondary"
                                                                    /> }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15, 25, 50, 75, 100]}
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
};

EnhancedTableAccount.defaultProps = {
    accounts: []
}

const mapStateToProps = state => ({
    accounts: state.account.accounts
});

const mapDispatchToProps = {
    getAllUserAccount: accountOperations.getAllUserAccount
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EnhancedTableAccount));
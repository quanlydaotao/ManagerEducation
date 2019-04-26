import React, { Component } from 'react';
import styles from './styles.css';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { EnhancedTable } from '../../components/EnhancedTable';
import { ButtonAdd } from '../../components/ButtonAdd';
import { connect } from 'react-redux';
import { accountShape } from '../../propTypes';
import { accountOperations } from '../../../state/ducks/account';
import { tableOperations } from '../../../state/ducks/table';


class ManageAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: [
                { id: 'imageUrl', numeric: false, disablePadding: false, label: 'Avatar' },
                { id: 'firstName', numeric: false, disablePadding: false, label: 'Họ' },
                { id: 'lastName', numeric: false, disablePadding: false, label: 'Tên' },
                { id: 'login', numeric: false, disablePadding: false, label: 'Mã đăng nhập' },
                { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
                { id: 'phone_number', numeric: false, disablePadding: false, label: 'Số điện thoại' },
                { id: 'authorities', numeric: false, disablePadding: false, label: 'Loại tài khoản' },
                { id: 'activated', numeric: false, disablePadding: false, label: 'Trạng thái' }
            ],
            cells: [
                'imageUrl',
                'firstName',
                'lastName',
                'login',
                'email',
                'phone_number',
                'authorities',
                'activated'                                                    
            ]
        }
    }

    componentDidMount() {
        this.props.setRows(this.state.rows);
        const { accounts } = this.props;
        if (accounts.length === 0) {
            this.props.getAllUserAccount();
        }
    }
    render() {
        const { accounts } = this.props;
        return (
            <DocumentTitle title='.:Quản lý tài khoản:.'>
                <div className={`${styles.mainManageAccount}`}>
                    <EnhancedTable listName="Danh sách tài khoản" datas={accounts} cells={this.state.cells}/>
                    <div className={`${styles.fixed}`}>
                        <ButtonAdd />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

ManageAccount.PropTypes = {
    accounts: PropTypes.arrayOf(accountShape).isRequired,
    getAllUserAccount: PropTypes.func.isRequired,
    setRows: PropTypes.func.isRequired
}

ManageAccount.defaultProps = {
    accounts: []
}

const mapStateToProps = state => ({
    accounts: state.account.accounts
});

const mapDispatchToProps = {
    getAllUserAccount: accountOperations.getAllUserAccount,
    setRows: tableOperations.setRows,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAccount);

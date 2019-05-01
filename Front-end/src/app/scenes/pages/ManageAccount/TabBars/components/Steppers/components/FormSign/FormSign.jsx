import React, { Component } from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

const style = theme => ({
    textField: {
        width: '515px'
    },
});

const ranges = [
    {
        value: '0-20',
        label: '0 to 20',
    },
    {
        value: '21-50',
        label: '21 to 50',
    },
    {
        value: '51-100',
        label: '51 to 100',
    },
];

class FormSign extends Component {
    state = {
        weightRange: '',
    };
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={`${styles.formSign}`}>
                <br />
                <div>
                    <div><b>Chú ý:</b></div>
                    <ul>
                        <li>- Các trường thông tin ở dưới là bắt buộc.</li>
                        <li>- Tên tài khoản tối thiểu 5 ký tự là mã số học viên.</li>
                        <li>- Mật khẩu tối thiểu 4 ký tự và tối đa 100 ký tự.</li>
                        <li>- Số điện thoại là các đầu số của VN.</li>
                    </ul>
                </div>
                <form>
                    <TextField
                        id="login"
                        label="Mã đăng nhập (*)"
                        type="text"
                        autoComplete="off"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        id="password"
                        label="Mật khẩu (*)"
                        type="password"
                        autoComplete="off"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        id="re-password"
                        type="password"
                        label="Nhập lại mật khẩu (*)"
                        autoComplete="off"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        id="phone_number"
                        type="text"
                        label="Số điện thoại (*)"
                        className={classes.textField}
                        margin="normal"
                        autoComplete="off"
                        variant="outlined"
                    />
                    <br />
                    <TextField
                        select
                        id="role"
                        className={classes.textField}
                        variant="outlined"
                        value={this.state.weightRange}
                        onChange={this.handleChange('weightRange')}
                        label="Loại tài khoản (*)"
                        margin="normal"
                    >
                        {ranges.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </form>
            </div>
        );
    }
}

FormSign.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(style)(FormSign);
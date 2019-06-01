import React, { Component } from 'react';
import styles from './styles.css';
import DocumentTitle from 'react-document-title';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import AddIcon from '@material-ui/icons/Add';
import CKEditor from 'ckeditor4-react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { connect } from 'react-redux';
import { yearsOperations } from '../../../../../../state/ducks/years';

const style = theme => ({
    snackbar: {
        margin: theme.spacing.unit,
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
    error: {
        backgroundColor: amber[700],
    },
    error1: {
        backgroundColor: theme.palette.error.dark,
    },
    success: {
        backgroundColor: '#338ef9',
    },
    button: {
        margin: theme.spacing.unit,
        fontSize: 13
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
});

class FormAddNewYears extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', startYears: '',
            openDay: null, closeDay: null, describe: '',
            maximumClasses: 0, status: true,
            errors: {
                name: '',
                startYears: '',
                maximumClasses: ''
            },
            open: false,
        }
    }

    handleChange = event => {
        var target = event.target;
        if (target.name === 'maximumClasses') {
            this.setState({ maximumClasses: parseInt(target.value) });
        } else if (target.name === 'status') {
            this.setState({ status: target.value === 'true' ? true : false });
        } else {
            this.setState({ [target.name]: target.value });
        }
    };

    handleChangeTextArea = event => {
        this.setState({
            describe: event.editor.getData()
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ open: true });
        const check = this.isErrors(this.state);
        if (check) {
            const {
                name, startYears, openDay, closeDay, describe, maximumClasses, status
            } = this.state;
            const formData = {
                name, startYears, openDay, closeDay, describe, maximumClasses, status
            }
            this.props.addNewYear(formData);
        }
    }

    isErrors = datas => {
        let name = "";
        let startYears = "";
        let maximumClasses = "";
        if (datas.name === '') {
            name = "Tên năm học không được để trống!";
        } else if (datas.name.length < 9 || datas.name.length > 100) {
            name = "Độ dài tên năm học lớn hơn hoặc bằng 9 ký tự và bé hơn hoặc bằng 100 ký tự!";
        } else {
            name = "";
        }

        if (datas.startYears === '') {
            startYears = "Vui lòng chọn năm học bắt đầu!";
        } else {
            try {
                let stYear = parseInt(datas.startYears);
                if (startYears < 0) {
                    startYears = "Năm học phải lớn hơn 0!";
                } else {
                    startYears= "";
                }
            } catch (error) {
                startYears = "Dữ liệu đầu vào không hợp lệ!";
            }
        }

        if(datas.maximumClasses < 0 || datas.maximumClasses > 100) {
            maximumClasses = "Số lớp học tối đa phải lớn hơn hoặc bằng 0 và bé hơn hoặc bằng 100!";
        } else {
            maximumClasses = "";
        }

        
        this.setState({ errors: { name, startYears, maximumClasses } });
        if (name === '' 
            && startYears === '' 
            && maximumClasses === '') {
            return true;
        }
        return false;
    }
    
    handleClose = () => {
        this.setState({ open: false });
    }

    handleClear = () => {
        this.setState({ describe: '' });
    }


    render() {
        const { classes, actions } = this.props;
        const { errors } = this.state;
        var isShowMessageBeforeSubit = errors.name !== '' 
            || errors.startYears !== '' 
            || errors.maximumClasses !== '';
        var isShowMessageFailueAfterSubit = !actions.progress 
            && actions.status === 'ADD_FAILED'
            && actions.data.status === 400 
            && actions.data.response;
        var isShowMessageSuccessAfterSubit = !actions.progress 
            && actions.status === 'ADD_SUCCESS';

        const currentYear = new Date().getFullYear();
        const allYears = [];
        for (let i = currentYear; i<=(currentYear+100); i++) {
            allYears.push(i);
        }
        let alert = () => {
            if (isShowMessageBeforeSubit || (!isShowMessageBeforeSubit && isShowMessageFailueAfterSubit)) {
                return (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={this.state.open && (isShowMessageBeforeSubit || isShowMessageFailueAfterSubit)}
                        autoHideDuration={6000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                    >
                        <SnackbarContent
                            className={classes.error}
                            message={
                                <span>
                                    <ul>
                                        {errors.name !== '' ? <li>{errors.name}</li> : ''}
                                        {errors.startYears !== '' ? <li>{errors.startYears}</li> : ''}
                                        {errors.endYears !== '' ? <li>{errors.endYears}</li> : ''}
                                        {errors.maximumClasses !== '' ? <li>{errors.maximumClasses}</li> : ''}
                                        {(!isShowMessageBeforeSubit && actions.data.status === 400 && actions.data.response) ?
                                            <li>{actions.data.response.createYearFailed ? actions.data.response.createYearFailed : 'Tạo năm học thất bại!'}</li> : ''}
                                    </ul>
                                </span>
                            }
                            action={[
                                <span>
                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        className={classes.close}
                                        onClick={this.handleClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </span>
                            ]}
                        />
                    </Snackbar>
                )
            } else if (!isShowMessageBeforeSubit && isShowMessageSuccessAfterSubit) {
                return (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={this.state.open && !isShowMessageBeforeSubit}
                        autoHideDuration={6000}
                        ContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                    >
                        <SnackbarContent
                            className={classes.success}
                            message={
                                <span>
                                    <ul>
                                        {(!isShowMessageBeforeSubit && isShowMessageSuccessAfterSubit) ? <li>Tạo năm học thành công!</li> : ''}
                                    </ul>
                                </span>
                            }
                            action={[
                                <span>
                                    <IconButton
                                        key="close"
                                        aria-label="Close"
                                        color="inherit"
                                        className={classes.close}
                                        onClick={this.handleClose}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </span>
                            ]}
                        />
                    </Snackbar>
                )
            }
        }
        return (
            <DocumentTitle title=".:Thêm năm học mới:.">
                <div className={`${styles.formAddNewYears}`}>
                    {alert()}
                    <h3>Thêm năm học mới</h3>
                    <div>
                        <div><b>Chú ý:</b></div>
                        <ul>
                            <li>- Các trường thông tin đánh dấu <b>(*)</b> ở dưới là bắt buộc.</li>
                            <li>- Tên năm học tối thiểu <b>9 ký tự</b> và tối đa <b>100 ký tự</b>.</li>
                            <li>- Năm học bắt đầu phải <b>bé hơn hoặc bằng năm học kết thúc</b>.</li>
                            <li>- Ngày khai giảng năm học có năm khai giảng phải nằm trong khoảng <b>năm học bắt đầu</b> và <b>năm học kết thúc</b>.</li>
                        </ul>
                    </div>
                    <div className="contentForm" style={{ display: 'block' }}>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="name"><b>Tên năm học: (*)</b></label>
                                    <input id="name" type="text" minLength="9" maxLength="100" onChange={this.handleChange} placeholder="VD: Năm học 2019" name="name" required />
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="startYears"><b>Năm học: (*)</b></label>
                                            <select name="startYears" id="startYears" onChange={this.handleChange} required>
                                                <option value="">--- CHỌN NĂM HỌC ---</option>
                                                { 
                                                    allYears.map((value, index) => (
                                                        <option key={index} value={value}>{value}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="maximumClasses"><b>Số khóa học tối đa: (*)</b></label>
                                            <input type="number" id="maximumClasses" pattern="^[0-9]+$" min={0} max={100} onChange={this.handleChange} placeholder="Số lớp học tối đa..." name="maximumClasses" required defaultValue={0} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="openDay"><b>Ngày khai giảng năm học:</b></label>
                                    <input type="date" id="openDay" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="openDay"/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="closeDay"><b>Ngày bế giảng năm học:</b></label>
                                    <input type="date" id="closeDay" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="closeDay"/>
                                </div>
                            </div>
                            <label htmlFor="describe"><b>Bài viết:</b></label>
                            <CKEditor
                                data={this.state.describe}
                                type="classic"
                                onChange={this.handleChangeTextArea}
                                config={{
                                    height: '420px'
                                }}
                            />
                            <br />
                            <label htmlFor="status"><b>Trạng thái:</b></label>
                            <select name="status" id="status" onChange={this.handleChange} required>
                                <option value={true}>--- MỞ NĂM HỌC ---</option>
                                <option value={false}>--- ĐÓNG NĂM HỌC ---</option>
                            </select>
                            <div className="clearfix">
                                <Button variant="contained" type="submit" color="primary" className={`reset-button ${classes.button}`}>
                                    THÊM MỚI
                                        <AddIcon className={classes.rightIcon} />
                                </Button>
                                {actions.progress ? <span style={{ marginLeft: 5, marginTop: 3 }}><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ fontSize: 30 }}></i></span> : ''}
                                <Button type="reset" color="secondary" className={`reset-button ${classes.button}`} onClick={this.handleClear}>
                                    XÓA THÔNG TIN
                                    <DeleteIcon className={classes.rightIcon} />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}


FormAddNewYears.propTypes = {
    classes: PropTypes.object.isRequired,
    addNewYear: PropTypes.func.isRequired,

};

FormAddNewYears.defaultProps = {
    actions: { progress: false, status: '', data: {} }
}

const mapStateToProps = state => ({
    actions: state.years.actionsYears
});

const mapDispatchToProps = {
    addNewYear: yearsOperations.addNewYear,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(FormAddNewYears));
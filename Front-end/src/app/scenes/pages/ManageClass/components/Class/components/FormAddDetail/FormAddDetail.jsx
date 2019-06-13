import React, { Component, Suspense } from 'react';
import styles from './styles.css';
import DocumentTitle from 'react-document-title';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import AddIcon from '@material-ui/icons/Add';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { classOperations } from '../../../../../../../state/ducks/class';
import randomstring from 'randomstring';
const PopupExitPage = React.lazy(() => import('../../../../../../components/Popup/PopupExitPage/PopupExitPage'));
import { history } from '../../../../../../../state/utils';

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

class FormAddDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            classCode: '',
            classRoom: '',
            openDay: null,
            closeDay: null,
            describe: '',
            status: true,
            yearId: 0,
            courseId: 0,
            errors: {
                name: '',
                openDay: ''
            },
            open: false,
            isBlocking: false,
            lastLocation: null,
            openExit: false
        }
    }

    componentWillMount() {
        this.setState({ isBlocking: true });
    }

    componentDidMount() {
        const { data } = this.props;
        let classCode = data.nameCourse.split('-');
        let classString = classCode[0] + classCode[1];
        let generateString = randomstring.generate(5);
        this.setState({
            name: data.name,
            yearId: data.year,
            courseId: data.course,
            classCode: (classString + generateString).toUpperCase()
        });
    }
    componentWillUnmount() {
        this.props.setYearAndCourse({ name: '', year: 0, course: 0, nameYear: '', nameCourse: '' });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ open: true });
        const check = this.isErrors(this.state);
        if (check) {
            const {
                name, classCode, openDay, closeDay, describe, classRoom, status, courseId
            } = this.state;
            const formData = {
                name, classCode, openDay, closeDay, describe, classRoom, status, courseId
            }
            this.props.createNewClass(formData);
        }
    }

    isErrors = datas => {
        let name = '';
        let openDay = '';

        if (datas.name === '') {
            name = 'Tên lớp học không được để trống!';
        } else if (datas.name.length < 5 || datas.name.length > 100) {
            name = "Độ dài tên lớp học lớn hơn hoặc bằng 5 ký tự và bé hơn hoặc bằng 100 ký tự!";
        } else {
            name = '';
        }

        if (datas.openDay === null) {
            openDay = 'Ngày mở lớp không được để trống!';
        } else {
            openDay = '';
        }


        this.setState({ errors: { name, openDay} });

        if (name === '' && openDay === '') {
            return true;
        }
        return false;
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleBlockedNavigation = (lastLocation) => {
        this.setState({ openExit: true, lastLocation });
        return false;
    }

    close = (callback) => this.setState({
        openExit: false
    }, callback);

    confirm = () => this.close(() => {
        const { lastLocation } = this.state;
        if (lastLocation) {
            this.setState({
                openExit: false
            }, () => {
                history.push(lastLocation.pathname);
            })
        }
    });

    closeFormEdit = () => {
        this.setState({ isBlocking: false });
        history.push('/admin/edu/classes/category');
    }

    render() {
        const { classes, status } = this.props;
        const { errors, name, classCode, isBlocking, openExit } = this.state;
        var isShowMessageBeforeSubit = errors.name !== ''|| errors.openDay !== '';
        var isShowMessageFailueAfterSubit = !status.progress
            && status.status === 'ADD_FAILED'
            && status.data.status === 400
            && status.data.response;
        var isShowMessageSuccessAfterSubit = !status.progress
            && status.status === 'ADD_SUCCESS';
        if (isShowMessageSuccessAfterSubit) {
            history.push('/admin/edu/classes');
        }
        let alert = () => {
            if (isShowMessageBeforeSubit
                || (!isShowMessageBeforeSubit
                    && isShowMessageFailueAfterSubit)
            ) {
                return (
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={
                            this.state.open && (isShowMessageBeforeSubit || isShowMessageFailueAfterSubit)
                        }
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
                                        {errors.openDay !== '' ? <li>{errors.openDay}</li> : ''}
                                        {(!isShowMessageBeforeSubit && status.data.status === 400 && status.data.response) ?
                                            <li>{status.data.response.createClassFailed ? status.data.response.createClassFailed : 'Tạo năm học thất bại!'}</li> : ''}
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
                                        {(!isShowMessageBeforeSubit && isShowMessageSuccessAfterSubit) ? <li>Thêm lớp học thành công!</li> : ''}
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
            <DocumentTitle title=".:Chi tiết lớp học:.">
                <div>
                    {alert()}
                    <Prompt
                        when={isBlocking}
                        message={this.handleBlockedNavigation}
                    />
                    <Suspense fallback={''}>
                        <PopupExitPage isShow={openExit} handleClose={this.close} handleConfirm={this.confirm} />
                    </Suspense>
                    <form onSubmit={this.handleSubmit} className={`${styles.formAddDetailClass}`}>
                        <h4 className="label-title">Thông tin chi tiết lớp học</h4>
                        <div>
                            <div><b>Chú ý:</b></div>
                            <ul className="attention">
                                <li>- Các trường thông tin đánh dấu <b>(*)</b> ở dưới là bắt buộc.</li>
                                <li>- Mỗi lớp học sẽ tự động có một mã lớp khác nhau</li>
                                <li>- Tên năm học tối thiểu <b>5 ký tự</b> và tối đa <b>100 ký tự.</b>.</li>
                                <li>- Ngày mở lớp phải nhỏ hơn ngày đóng lớp.</li>
                            </ul>
                        </div>
                        <div className="contentForm" style={{ display: 'block' }}>
                            <div className="row">
                                <div className="col-md-2">
                                    <label htmlFor="classCode"><b>Mã lớp học: (* Auto generate)</b></label>
                                    <input id="classCode" type="text" disabled placeholder="Mã lớp" className={`${styles.hide}`} defaultValue={classCode} />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="name"><b>Tên lớp học: (*)</b></label>
                                    <input id="name" type="text" minLength="5" maxLength="100" onChange={this.handleChange} placeholder="VD: Năm học 2019" name="name" defaultValue={name} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="classRoom"><b>Phòng học:</b></label>
                                    <input id="classRoom" type="text" onChange={this.handleChange} placeholder="VD: 201-TA1" name="classRoom" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="openDay"><b>Ngày mở lớp (*):</b></label>
                                    <input type="date" id="openDay" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="openDay" required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="closeDay"><b>Ngày đóng lớp:</b></label>
                                    <input type="date" id="closeDay" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="closeDay" />
                                </div>
                            </div>
                            <label htmlFor="describe"><b>Mô tả ngắn:</b></label>
                            <textarea id="describe" name="describe" rows="10" placeholder="Mô tả ngắn..." onChange={this.handleChange}></textarea>
                            <br />
                            <label htmlFor="status"><b>Trạng thái:</b></label>
                            <select name="status" id="status" onChange={this.handleChange} required>
                                <option value={true}>--- MỞ LỚP HỌC ---</option>
                                <option value={false}>--- ĐÓNG LỚP HỌC ---</option>
                            </select>
                            <div className="clearfix">
                                <Button variant="contained" type="submit" color="primary" className={`reset-button ${classes.button}`}>
                                    THÊM MỚI
                                        <AddIcon className={classes.rightIcon} />
                                </Button>
                                {status.progress ? <span style={{ marginLeft: 5, marginTop: 3 }}><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ fontSize: 30 }}></i></span> : ''}
                                <Button onClick={this.closeFormEdit} color="secondary">
                                    Hủy bỏ
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </DocumentTitle>
        );
    }
}

FormAddDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    createNewClass: PropTypes.func.isRequired,
    status: PropTypes.object.isRequired,
};

FormAddDetail.defaultProps = {
    status: { progress: false, status: '', data: {} },
    data: { name: '', year: '', course: '' }
}

const mapStateToProps = state => ({
    status: state.class.status
});

const mapDispatchToProps = {
    createNewClass: classOperations.doCreateNewClass,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(FormAddDetail)));

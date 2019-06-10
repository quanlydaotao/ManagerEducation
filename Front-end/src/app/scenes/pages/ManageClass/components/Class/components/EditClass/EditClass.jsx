import React, { Suspense } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import styles from './styles.css';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import { Prompt } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { withRouter } from 'react-router';
import { classOperations } from '../../../../../../../state/ducks/class';
import DocumentTitle from 'react-document-title';
const PopupExitPage = React.lazy(() => import('../../../../../../components/Popup/PopupExitPage/PopupExitPage'));
import { history } from '../../../../../../../state/utils';


const style = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        marginRight: '10px',
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
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


function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class EditClass extends React.Component {
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
                openDay: '',
                closeDay: '',
                day: ''
            },
            isBlocking: false,
            lastLocation: null,
            openExit: false
        }
    }


    componentWillMount() {
        this.setState({ isBlocking: true });
        this.props.findClassById(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.detail.id !== prevProps.detail.id) {
            const { detail } = this.props;
            const {
                id,
                name,
                classCode,
                classRoom,
                openDay,
                closeDay,
                describe,
                status,
            } = detail;
            this.setState({
                id,
                name,
                classCode,
                classRoom,
                openDay,
                closeDay,
                describe,
                status
            });
        }
    }


    handleOpen = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ open: true });
        const check = this.isErrors(this.state);
        if (check) {
            const {
                id, name, classCode, openDay, closeDay, describe, classRoom, status
            } = this.state;
            const formData = {
                id, name, classCode, openDay, closeDay, describe, classRoom, status
            }
            this.props.updateClass(formData);
        }
    }

    isErrors = datas => {
        let name = '';
        let openDay = '';
        let closeDay = '';
        let day = ''

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

        if (datas.closeDay === null) {
            closeDay = 'Ngày đóng lớp không được để trống!';
        } else {
            closeDay = '';
        }

        const op = Date.parse(datas.openDay);
        const cl = Date.parse(datas.closeDay);

        if (cl - op <= 0) {
            day = 'Ngày mở đóng lớp phải lớn hơn ngày mở lớp!';
        } else {
            day = '';
        }

        this.setState({ errors: { name, openDay, closeDay, day } });

        if (name === ''
            && openDay === ''
            && closeDay === '' && day === '') {
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
                history.replace(lastLocation.pathname);
            })
        }
    });

    closeFormEdit = () => {
        this.setState({ isBlocking: false });
        history.replace('/admin/edu/classes');
    }

    render() {
        const { classes, status } = this.props;
        const { errors, isBlocking, openExit } = this.state;
        var isShowMessageBeforeSubit = errors.name !== ''
            || errors.openDay !== ''
            || errors.closeDay !== ''
            || errors.day !== '';
        var isShowMessageFailueAfterSubit = !status.progress
            && status.status === 'UPDATE_FAILED'
            && status.data.status === 400
            && status.data.response;
        var isShowMessageSuccessAfterSubit = !status.progress
            && status.status === 'UPDATE_SUCCESS';
        if (isShowMessageSuccessAfterSubit) {
            history.replace('/admin/edu/classes');
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
                                        {errors.closeDay !== '' ? <li>{errors.closeDay}</li> : ''}
                                        {errors.day !== '' ? <li>{errors.day}</li> : ''}
                                        {(!isShowMessageBeforeSubit && status.data.status === 400 && status.data.response) ?
                                            <li>{status.data.response.updateClassFailed ? status.data.response.updateClassFailed : 'Cập nhật lớp học thất bại!'}</li> : ''}
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
                                        {(!isShowMessageBeforeSubit && isShowMessageSuccessAfterSubit) ? <li>Cập nhật thông tin lớp học thành công!</li> : ''}
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
            <DocumentTitle title=".:Cập nhật lớp học:.">
                <div>
                    {alert()}
                    <Prompt
                        when={isBlocking}
                        message={this.handleBlockedNavigation}
                    />
                    <Suspense fallback={''}>
                        <PopupExitPage isShow={openExit} handleClose={this.close} handleConfirm={this.confirm} />
                    </Suspense>
                    <form onSubmit={this.handleSubmit} className={`${styles.formEditClass}`}>
                        <h4 className="label-title">Chỉnh sửa thông tin chi tiết lớp học</h4>
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
                                    <input id="classCode" type="text" disabled placeholder="Mã lớp" className={`${styles.hide}`} defaultValue={this.state.classCode} />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="name"><b>Tên lớp học: (*)</b></label>
                                    <input id="name" type="text" minLength="5" maxLength="100" onChange={this.handleChange} placeholder="VD: Năm học 2019" name="name" defaultValue={this.state.name} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="classRoom"><b>Phòng học:</b></label>
                                    <input id="classRoom" type="text" onChange={this.handleChange} placeholder="VD: 201-TA1" name="classRoom" defaultValue={this.state.classRoom} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="openDay"><b>Ngày mở lớp (*):</b></label>
                                    <input type="date" id="openDay" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="openDay" defaultValue={this.state.openDay} required />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="closeDay"><b>Ngày đóng lớp (*):</b></label>
                                    <input type="date" id="closeDay" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="closeDay" defaultValue={this.state.closeDay} required />
                                </div>
                            </div>
                            <label htmlFor="describe"><b>Mô tả ngắn:</b></label>
                            <textarea id="describe" name="describe" rows="10" placeholder="Mô tả ngắn..." onChange={this.handleChange} value={this.state.describe}></textarea>
                            <br />
                            <label htmlFor="status"><b>Trạng thái:</b></label>
                            <select name="status" id="status" onChange={this.handleChange} required>
                                <option value={true} selected={this.state.status ? true : false}>--- MỞ LỚP HỌC ---</option>
                                <option value={false} selected={!this.state.status ? true : false}>--- ĐÓNG LỚP HỌC ---</option>
                            </select>
                            <div>
                                <Button variant="contained" type="submit" color="primary" className="mr-3">
                                    Lưu
                            </Button>
                                <Button onClick={this.closeFormEdit} color="secondary">
                                    Hủy bỏ
                            </Button>
                                {status.progress ?
                                    <span style={{ marginLeft: 5, marginTop: 3 }}>
                                        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"
                                            style={{ fontSize: 30 }}>
                                        </i>
                                    </span> : ''}
                            </div>
                        </div>
                    </form>
                </div>
            </DocumentTitle>
        );
    }
}

EditClass.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.objectOf({
        progress: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }).isRequired,
    detail: PropTypes.object.isRequired,
    updateClass: PropTypes.func.isRequired,
    findClassById: PropTypes.func.isRequired
}

EditClass.defaultProps = {
    status: { progress: false, status: '', data: {} },
    detail: {}
}

const mapStateToProps = state => ({
    status: state.class.status,
    detail: state.class.detail
});

const mapDispatchToProps = {
    updateClass: classOperations.doUpdateClass,
    findClassById: classOperations.doGetClassById
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EditClass)));
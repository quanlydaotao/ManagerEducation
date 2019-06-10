import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import styles from './styles.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CKEditor from 'ckeditor4-react';
import { yearsOperations } from '../../../../state/ducks/years';
import { toggleOperations } from '../../../../state/ducks/toggle';

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

function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

class PopupFormEditClass extends React.Component {
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
            open: false,
        }
    }

    componentDidMount() {
        const { data } = this.props;
        console.log(data);
        const {
            id,
            name,
            classCode,
            classRoom,
            openDay, 
            closeDay, 
            describe,
            status,
        } = data;
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
                name, classCode, openDay, closeDay, describe, classRoom, status, courseId
            } = this.state;
            const formData = {
                name, classCode, openDay, closeDay, describe, classRoom, status, courseId
            }
            // this.props.createNewClass(formData);
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

        if ( cl - op <= 0 ) {
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

    render() {
        const { classes, statusForm } = this.props;
        const { errors, name, classCode, openDay, closeDay, describe, status, classRoom } = this.state;
        var isShowMessageBeforeSubit = errors.name !== '' 
            || errors.openDay !== '' 
            || errors.closeDay !== ''
            || errors.day !== '';
        var isShowMessageFailueAfterSubit = !status.progress 
            && status.status === 'ADD_FAILED'
            && status.data.status === 400 
            && status.data.response;
        var isShowMessageSuccessAfterSubit = !status.progress 
            && status.status === 'ADD_SUCCESS';
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
                                        {errors.openDay !== '' ? <li>{errors.openDay }</li> : ''}
                                        {errors.closeDay  !== '' ? <li>{errors.closeDay}</li> : ''}
                                        {errors.day !== '' ? <li>{errors.day}</li> : ''}
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
                                        {(!isShowMessageBeforeSubit && isShowMessageSuccessAfterSubit) ? <li>Chỉnh sửa thông tin lớp học thành công!</li> : ''}
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
            <div>
                {alert()}
                <Dialog
                    fullWidth={true}
                    maxWidth="lg"
                    open={statusForm}
                    onClose={this.props.closeFormEdit}
                    aria-labelledby="draggable-dialog-title"
                >
                    <div className={`${styles.formEditClass}`}>
                        {alert()}
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
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-md-2">
                                        <label htmlFor="classCode"><b>Mã lớp học: (*)</b></label>
                                        <input id="classCode" type="text" disabled placeholder="Mã lớp" className={`${styles.hide}`} defaultValue={classCode}/>
                                    </div>
                                    <div className="col-md-4">
                                        <label htmlFor="name"><b>Tên lớp học: (*)</b></label>
                                        <input id="name" type="text" minLength="5" maxLength="100" onChange={this.handleChange} placeholder="VD: Năm học 2019" name="name" defaultValue={name} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="classRoom"><b>Phòng học:</b></label>
                                        <input id="classRoom" type="text" onChange={this.handleChange} placeholder="VD: 201-TA1" name="classRoom" defaultValue={classRoom}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="openDay"><b>Ngày mở lớp (*):</b></label>
                                        <input type="date" id="openDay" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="openDay" defaultValue={openDay} required/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="closeDay"><b>Ngày đóng lớp (*):</b></label>
                                        <input type="date" id="closeDay" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="closeDay" defaultValue={closeDay} required/>
                                    </div>
                                </div>
                                <label htmlFor="describe"><b>Mô tả ngắn:</b></label>
                                <textarea id="describe" name="describe" rows="10" placeholder="Mô tả ngắn..." onChange={this.handleChange} defaultValue={describe}></textarea>
                                <br />
                                <label htmlFor="status"><b>Trạng thái:</b></label>
                                <select name="status" id="status" onChange={this.handleChange} required>
                                    <option value={true} selected={this.state.status ? true : false}>--- MỞ LỚP HỌC ---</option> 
                                    <option value={false} selected={!this.state.status ? true : false}>--- ĐÓNG LỚP HỌC ---</option>
                                </select>
                                <DialogActions>
                                    <Button onClick={this.props.closeFormEdit} color="primary">
                                        Thoát
                                    </Button>
                                    <Button type="submit" color="primary">
                                        Lưu
                                    </Button>
                                    {status.progress ? <span style={{ marginLeft: 5, marginTop: 3 }}><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ fontSize: 30 }}></i></span> : ''}
                                </DialogActions>
                            </form>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

PopupFormEditClass.propTypes = {
    classes: PropTypes.object.isRequired,
    actions: PropTypes.objectOf({
        progress: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }).isRequired,

    closeFormEdit: PropTypes.func.isRequired,
    updateYear: PropTypes.func.isRequired,
}

PopupFormEditClass.defaultProps = {
    statusForm: false,
    status: { progress: false, status: '', data: {} },
}

const mapStateToProps = state => ({
    statusForm: state.toggle.toggleFormEdit,
    status: state.years.status
});

const mapDispatchToProps = {
    closeFormEdit: toggleOperations.doCloseFormEditYear,
    updateYear:  yearsOperations.doUpdateYear,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PopupFormEditClass));
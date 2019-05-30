import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import { yearsOperations } from '../../../../state/ducks/years';
import Draggable from 'react-draggable';
import { connect } from 'react-redux';
import styles from './styles.css';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import LockIcon from '@material-ui/icons/Lock';
import { yearsShape } from '../../../propTypes';
import ScreenLockRotationIcon from '@material-ui/icons/ScreenLockRotation';
import PhoneLinkRingIcon from '@material-ui/icons/PhonelinkRing';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import ContactsIcon from '@material-ui/icons/Contacts';
import Snackbar from '@material-ui/core/Snackbar';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CKEditor from 'ckeditor4-react';


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

class PopupFormEditYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0, name: '', startYears: '',
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

    componentDidMount() {
        const { data } = this.props;
        const {
            id, name, startYears, openDay,
            closeDay, describe, status, maximumClasses
        } = data;
        this.setState({
            id, name, startYears, openDay,
            closeDay, maximumClasses, describe, status
        });
    }

    handleOpen = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

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
                id, name, startYears, openDay, closeDay, describe, maximumClasses, status
            } = this.state;
            const formData = {
                id, name, startYears, openDay, closeDay, describe, maximumClasses, status
            }
            this.props.updateYear(formData);
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
        const { classes, actions, statusForm, data } = this.props;
        const { errors } = this.state;
        var isShowMessageBeforeSubit = errors.name !== '' 
            || errors.startYears !== '' 
            || errors.maximumClasses !== '';
        var isShowMessageFailueAfterSubit = !actions.progress 
            && actions.status === 'UPDATE_FAILED'
            && actions.data.status === 400 
            && actions.data.response;
        var isShowMessageSuccessAfterSubit = !actions.progress 
            && actions.status === 'UPDATE_SUCCESS';

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
                                            <li>{actions.data.response.updateYearFailed ? actions.data.response.updateYearFailed : 'Tạo năm học thất bại!'}</li> : ''}
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
                                        {(!isShowMessageBeforeSubit && isShowMessageSuccessAfterSubit) ? <li>Cập nhật năm học thành công!</li> : ''}
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
                    onClose={this.props.closeForm}
                    aria-labelledby="draggable-dialog-title"
                >
                    <form onSubmit={this.handleSubmit}>
                        <DialogTitle id="draggable-dialog-title">Chỉnh sửa thông tin năm đào tạo</DialogTitle>
                        <hr className="tall" />
                        <br />
                        <DialogContent>
                            <DialogContentText style={{ fontSize: '13px' }}>
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
                                             <div className="col-md-4">
                                                <label htmlFor="name"><b>Tên năm học: (*)</b></label>
                                                <input id="name" type="text" minLength="9" maxLength="100" onChange={this.handleChange} placeholder="VD: Năm học 2019" name="name" defaultValue={this.state.name} required />
                                                <label htmlFor="startYears"><b>Năm học: (*)</b></label>
                                                <select name="startYears" id="startYears" onChange={this.handleChange} required>
                                                    { this.state.startYears ? <option value={this.state.startYears} selected>{this.state.startYears}</option> :  <option value="">--- CHỌN NĂM HỌC ---</option>}
                                                    { 
                                                        allYears.map((value, index) => (
                                                            <option key={index} value={value}>{value}</option>
                                                        ))
                                                    }
                                                </select>
                                                <label htmlFor="maximumClasses"><b>Số khóa học tối đa: (*)</b></label>
                                                <input type="number" id="maximumClasses" pattern="^[0-9]+$" min={0} max={100} onChange={this.handleChange} placeholder="Số khóa học tối đa..." name="maximumClasses" required defaultValue={this.state.maximumClasses}/>
                                                <label htmlFor="openDay"><b>Ngày khai giảng năm học:</b></label>
                                                <input type="date" id="openDay" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="openDay" defaultValue={this.state.openDay}/>
                                                <label htmlFor="closeDay"><b>Ngày bế giảng năm học:</b></label>
                                                <input type="date" id="closeDay" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="closeDay" defaultValue={this.state.closeDay}/>
                                                <label htmlFor="status"><b>Trạng thái:</b></label>
                                                <select name="status" id="status" onChange={this.handleChange} required>
                                                    <option value={true} selected={this.state.status ? true : false}>--- MỞ NĂM HỌC ---</option> 
                                                    <option value={false} selected={!this.state.status ? true : false}>--- ĐÓNG NĂM HỌC ---</option>
                                                </select>
                                            </div>
                                            <div className="col-md-8">
                                                <label htmlFor="describe"><b>Bài viết:</b></label>
                                                <br />
                                                <CKEditor
                                                    data={this.state.describe}
                                                    type="classic"
                                                    onChange={this.handleChangeTextArea}
                                                    config={{
                                                        height: '420px'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <hr className="tall" />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.props.closeForm} color="primary">
                                Thoát
                            </Button>
                            <Button type="submit" color="primary">
                                Lưu
                            </Button>
                            {actions.progress ? <span style={{ marginLeft: 5, marginTop: 3 }}><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ fontSize: 30 }}></i></span> : ''}
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

PopupFormEditYear.propTypes = {
    closeForm: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    updateUserAccount: PropTypes.func.isRequired,
    actions: PropTypes.objectOf({
        progress: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }).isRequired
}

PopupFormEditYear.defaultProps = {
    statusForm: false,
    actions: { progress: false, status: '', data: {} },
}

const mapStateToProps = state => ({
    statusForm: state.years.toggleEditYears,
    actions: state.years.actionsYears
});

const mapDispatchToProps = {
    closeForm: yearsOperations.closeFormEdit,
    updateYear:  yearsOperations.updateYear,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(PopupFormEditYear));
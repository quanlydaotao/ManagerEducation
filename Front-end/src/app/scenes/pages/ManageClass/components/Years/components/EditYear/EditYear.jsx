import React, { Suspense } from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
import CKEditor from 'ckeditor4-react';
import { withRouter } from 'react-router';
import { yearsOperations } from '../../../../../../../state/ducks/years';
import DocumentTitle from 'react-document-title';
import { toggleOperations } from '../../../../../../../state/ducks/toggle';
import { fileOperations } from '../../../../../../../state/ducks/file';
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

class EditYear extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0, 
            name: '', 
            startYears: '',
            openDay: null, 
            closeDay: null, 
            describe: '',
            maximumClasses: 0, 
            status: true,
            errors: {
                name: '',
                startYears: '',
                maximumClasses: ''
            },
            open: false,
            isBlocking: false,
            lastLocation: null,
            openExit: false
        }
    }

    componentWillMount() {
        this.setState({ isBlocking: true });
        this.props.findYearById(this.props.match.params.id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.detail.id !== prevProps.detail.id) {
            const { detail } = this.props;
            const {
                id, 
                login,
                phoneNumber, 
                authorities,
                imageUrl, 
                firstName, 
                lastName, 
                email, 
                birthday, 
                sex, 
                nations,
                address, 
                address1, 
                identityCardNumber, 
                activated
            } = detail;
            this.setState({
                id,
                login,
                phoneNumber, 
                authorities,
                imageUrl, 
                firstName, 
                lastName, 
                email,
                birthday, 
                sex, 
                nations, 
                address, 
                address1,
                identityCardNumber, 
                activated
            });
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
                id, 
                name, 
                startYears, 
                openDay, 
                closeDay, 
                describe, 
                maximumClasses, 
                status
            } = this.state;
            const formData = {
                id, 
                name, 
                startYears, 
                openDay, 
                closeDay, 
                describe, 
                maximumClasses, 
                status
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

    handleBlockedNavigation = (lastLocation) => {
       this.setState({ openExit: true, lastLocation });
       return false;
    }

    close = (callback) => this.setState({
               openExit: false
             }, callback);

    confirm = () => this.close(() => {
       const {lastLocation} = this.state;
       if (lastLocation) {
          this.setState({
             openExit: false
          }, () => {  
             history.replace(lastLocation.pathname);
          })
       }
     });


    render() {
        const { classes, status, statusForm } = this.props;
        const { errors, isBlocking, openExit } = this.state;
        var isShowMessageBeforeSubit = errors.name !== '' 
            || errors.startYears !== '' 
            || errors.maximumClasses !== '';
        var isShowMessageFailueAfterSubit = !status.progress 
            && status.status === 'UPDATE_FAILED'
            && status.data.status === 400 
            && status.data.response;
        var isShowMessageSuccessAfterSubit = !status.progress 
            && status.status === 'UPDATE_SUCCESS';

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
                                        {(!isShowMessageBeforeSubit && status.data.status === 400 && status.data.response) ?
                                            <li>{status.data.response.updateYearFailed ? status.data.response.updateYearFailed : 'Tạo năm học thất bại!'}</li> : ''}
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
            <DocumentTitle title=".:Cập nhật tài khoản:.">
                <div>
                    {alert()}
                    <Prompt 
                        when={isBlocking}
                        message={this.handleBlockedNavigation}
                    />
                    <Suspense fallback={''}>
                        <PopupExitPage isShow={openExit} handleClose={this.close} handleConfirm={this.confirm} />
                    </Suspense>
                    <form onSubmit={this.handleSubmit} className={`${styles.formEditYear}`}>
                        <br />
                        <h4 className="label-title">Chỉnh sửa thông tin năm đào tạo</h4>
                        <br />
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
                        </div>
                        <div>
                            <Button variant="contained" type="submit" color="primary" className="mr-3">
                                Lưu
                            </Button>
                            <Button onClick={this.props.closeFormEdit} color="secondary">
                                Hủy bỏ
                            </Button>
                            {status.progress ? 
                                <span style={{ marginLeft: 5, marginTop: 3 }}>
                                    <i class="fa fa-spinner fa-pulse fa-3x fa-fw" 
                                       style={{ fontSize: 30 }}>
                                    </i>
                                </span> : ''}
                        </div>
                    </form>
                </div>
            </DocumentTitle>
        );
    }
}

EditYear.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.objectOf({
        progress: PropTypes.bool.isRequired,
        status: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired
    }).isRequired,
    findYearById: PropTypes.object.isRequired,
    updateYear: PropTypes.func.isRequired,
}

EditYear.defaultProps = {
    status: { progress: false, status: '', data: {} },
}

const mapStateToProps = state => ({
    status: state.years.status,
    detail: state.years.detail
});

const mapDispatchToProps = {
    updateYear:  yearsOperations.doUpdateYear,
    findYearById: yearsOperations.doGetYearById
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EditYear)));
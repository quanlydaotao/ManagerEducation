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
    render() {
        const { classes } = this.props;
        return (
            <DocumentTitle title=".:Thêm năm học mới:.">
                <div className={`${styles.formAddNewYears}`}>
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
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="name"><b>Tên năm học: (*)</b></label>
                                    <input type="text" pattern="" minLength="9" maxLength="100" onChange={this.handleChange} placeholder="VD: Năm học 2019-2020" name="name" required />
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="startYears"><b>Năm học bắt đầu: (*)</b></label>
                                            <select name="startYears" id="startYears" onChange={this.handleChange} required>
                                                <option value="">--- CHỌN NĂM BẮT ĐẦU ---</option>
                                                <option value="2019">2019</option>
                                                <option value="2018">2018</option>
                                                <option value="2017">2017</option>
                                                <option value="2016">2016</option>
                                                <option value="2015">2015</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="endYears"><b>Năm học kết thúc: (*)</b></label>
                                            <select name="endYears" id="endYears" onChange={this.handleChange} required>
                                                <option value="">--- CHỌN NĂM KẾT THÚC ---</option>
                                                <option value="2019">2019</option>
                                                <option value="2018">2018</option>
                                                <option value="2017">2017</option>
                                                <option value="2016">2016</option>
                                                <option value="2015">2015</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label htmlFor="openDay"><b>Ngày khai giảng: (*)</b></label>
                            <input type="date" onChange={this.handleChange} placeholder="VD: 09/05/2019" name="openDay" required />
                            <label htmlFor="describe"><b>Mô tả thêm:</b></label>
                            <CKEditor />
                            <br />
                            <label htmlFor="maximumClasses"><b>Số lớp học tối đa:</b></label>
                            <input type="number" pattern="" min={0} max={100} onChange={this.handleChange} placeholder="Số lớp học tối đa..." name="maximumClasses" required defaultValue={0} />
                            <label htmlFor="status"><b>Trạng thái:</b></label>
                            <select name="status" id="status" onChange={this.handleChange} required>
                                <option value={true}>--- MỞ LỚP ---</option>
                                <option value={false}>--- ĐÓNG LỚP ---</option>
                            </select>
                            <p>By creating an account you agree to our <a href="#" style={{ color: 'dodgerblue' }}>Terms &amp; Privacy</a>.</p>
                            <div className="clearfix">
                                <Button variant="contained" type="reset" color="secondary" className={classes.button} onClick={this.clearData}>
                                    XÓA THÔNG TIN
                                            <DeleteIcon className={classes.rightIcon} />
                                </Button>
                                <Button variant="contained" type="submit" color="primary" className={classes.button}>
                                    THÊM MỚI
                                        <AddIcon className={classes.rightIcon} />
                                </Button>
                                {/* {actions.progress ? <span style={{ marginLeft: 5, marginTop: 3 }}><i class="fa fa-spinner fa-pulse fa-3x fa-fw" style={{ fontSize: 30 }}></i></span> : ''} */}
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
};

export default withStyles(style)(FormAddNewYears);
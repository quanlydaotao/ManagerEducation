import React from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { yearsOperations } from '../../../state/ducks/years';
import { courseOperations } from '../../../state/ducks/course';
import { yearsShape } from '../../propTypes';
import { coursesShape } from '../../propTypes';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const style = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
});

class Sort extends React.Component {
    state = {
        open: false,
        yearId: 0,
        courseId: 0
    };

    componentDidMount() {
        this.props.getAllYears();
    }

    handleChange = name => event => {
        const target = event.target;
        if (name === 'year') {
            this.props.getCourseByYearId(target.value);
            this.setState({ yearId: target.value });
        } else if (name === 'course') {
            this.setState({ courseId: target.value });
        }
    }

    handleOk = () => {
        const { yearId, courseId } = this.state;
        this.props.selectYear(yearId);
        this.props.selectCourse(courseId);
        this.setState({ open: false });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    render() {
        const { classes, years, courses } = this.props;
        let yearOption = years.map((value, index) => <option key={index} value={value.id}>NĂM HỌC {value.startYears}</option>);
        let courseOption = courses.map((value, index) => <option key={index} value={value.id}>KHÓA  {value.name}</option>);
        return (
            <div className={`${styles.sort}`}>
                <Button variant="outlined" onClick={this.handleClickOpen}>CHỌN LỚP HỌC</Button>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <DialogTitle>LỌC DỮ LIỆU</DialogTitle>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">CHỌN NĂM HỌC</InputLabel>
                                <Select
                                    native
                                    onChange={this.handleChange('year')}
                                    input={<Input id="age-native-simple" />}
                                >
                                    <option value=""></option>
                                    { yearOption }
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">CHỌN NĂM HỌC</InputLabel>
                                <Select
                                    native
                                    onChange={this.handleChange('course')}
                                    input={<Input id="age-native-simple" />}
                                >
                                    <option value=""></option>
                                    { courseOption }
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleOk} color="primary">
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
Sort.propTypes = {
    years: PropTypes.arrayOf(yearsShape).isRequired,
    cources: PropTypes.arrayOf(coursesShape).isRequired,
    getAllYears: PropTypes.func.isRequired,
    selectYear: PropTypes.func.isRequired,
    getCourseByYearId: PropTypes.func.isRequired,
    selectCourse: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

Sort.defaultProps = {
    years: [], 
    courses: []
}

const mapStateToProps = state => ({
    years: state.years.list,
    courses: state.course.list
});

const mapDispatchToProps = {
    getAllYears: yearsOperations.doGetAllYears,
    selectYear: yearsOperations.doSelectYear,
    selectCourse: courseOperations.doSelectCourse,
    getCourseByYearId: courseOperations.doGetAllCourseByYearId
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Sort));

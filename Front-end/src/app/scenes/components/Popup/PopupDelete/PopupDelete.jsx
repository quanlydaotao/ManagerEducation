import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import { popupOperations } from '../../../../state/ducks/popup';

class PopupDelete extends React.Component {

    handleDelete = () => {
        this.props.delete();
        this.props.closePopupDelete();
    }
    
    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.closePopupDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Bạn có chắc chắn muốn xóa các trường đã chọn?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Sau khi xóa, tất cả dữ liệu sẽ bị xóa vĩnh viễn và không thể khôi phục. Bạn hãy chắc
                            chắn rằng các trường thông tin bạn đã chọn là những trường mà bạn sẽ xóa.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closePopupDelete} color="primary">
                            Trở về
                        </Button>
                        <Button onClick={this.handleDelete} color="primary" autoFocus>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

PopupDelete.propTypes = {
  open: PropTypes.bool.isRequired,
  closePopupDelete: PropTypes.func.isRequired
}

PopupDelete.defaultProps = {
  open: false
}

const mapStatetoProps = state => ({
  open: state.popup.popupDelete
});

const mapDispatchToProps = {
  closePopupDelete: popupOperations.closePopupDelete,
};

export default connect(mapStatetoProps, mapDispatchToProps)(PopupDelete);
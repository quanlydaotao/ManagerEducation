import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class PopupExitPage extends React.Component {

  handleClosePopup = () => {
    this.props.handleClose();
  };

  handleBackPrompt = () => {
    this.props.handleConfirm();
  };

  render() {
    const { fullScreen, isShow } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={isShow}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Bạn có chắc chắn muốn hủy thay đổi?"}</DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClosePopup} color="primary">
              Hủy
            </Button>
            <Button variant="contained" onClick={this.handleBackPrompt} color="secondary" autoFocus>
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

PopupExitPage.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(PopupExitPage);
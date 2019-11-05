import * as React from 'react';

// third party apps
import { createMuiTheme } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ThemeProvider } from '@material-ui/styles';

// interfaces
import { TripsModalProps } from './interfaces';

const TripsModal: React.FunctionComponent<TripsModalProps> = (props) => {
  const { open, handleClose, handleSubmitRequest } = props;
  const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        textPrimary: {
          color: '#1967d2',
        },
        textSecondary: {
          color: '#3f51b5',
        },
      },
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle>{'Confirm Request for this Trip?'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Click the continue button to confirm request for this trip.
              You'll recieve an email notification confirming your request.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Dismiss
            </Button>
            <Button onClick={handleSubmitRequest} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default TripsModal;

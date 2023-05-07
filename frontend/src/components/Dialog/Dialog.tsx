import React, { FC, useState } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,

} from '@mui/material';
import Dialog_ from '@mui/material/Dialog';

interface IDialogProps {
  handler: () => void,
  OpenButton?: React.ReactNode | any,
  succesValue: React.ReactNode | any,
  failureValue: React.ReactNode | any,
  value: React.ReactNode | any,
  Icon?: React.ReactNode | null
}

const Dialog: FC<IDialogProps> = ({
  handler,
  OpenButton,
  succesValue,
  failureValue,
  value,

}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {
        React.cloneElement(OpenButton,{onClick:handleOpen})
      }
      <Dialog_
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Are you sure you want to delete your account?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {value}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{failureValue}</Button>
          <Button onClick={handler}>{succesValue}</Button>
        </DialogActions>
      </Dialog_>
    </>
  );
};

export default Dialog;

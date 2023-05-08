import React, { FC, useState } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,

} from '@mui/material';
import Dialog2 from '@mui/material/Dialog';

interface IDialogProps {
  handler: () => void,
  OpenButton?: React.ReactNode | any,
  succesValue: React.ReactNode | any,
  failureValue: React.ReactNode | any,
  value?: React.ReactNode | any,
  Icon?: React.ReactNode | null
  children?: any,
  title?: string
}

const Dialog: FC<IDialogProps> = ({
  handler,
  OpenButton,
  succesValue,
  failureValue,
  value,
  children,
  title,
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
        React.cloneElement(OpenButton, { onClick: handleOpen })
      }

      <Dialog2
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {value}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{failureValue}</Button>
          <Button onClick={handler}>{succesValue}</Button>
        </DialogActions>
      </Dialog2>
    </>
  );
};

export default Dialog;

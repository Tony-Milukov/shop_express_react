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
  //will run on succes button
  handler: () => void,

  //button which opens dialog
  OpenButton?: React.ReactNode | any,

  //text which will be shown in success button which calls handler
  succesValue: React.ReactNode | any,

  //TEXT which  will be shown in failure button closes dialog without running handler
  failureValue: React.ReactNode | any,

  //some text in the dialog
  value?: React.ReactNode | any,

  //children that could be rendered in the dialog
  children?: any,

  //dialog title
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

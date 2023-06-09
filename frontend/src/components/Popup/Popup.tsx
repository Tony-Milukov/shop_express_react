import { Button, Modal, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { FC, useState } from 'react';
import Box from '@mui/material/Box';
import './popup.css';

interface IPopup {
  title?: string,
  message?: string,
  redirect?: string,
}

const Popup: FC<IPopup> = ({
  message = 'something went wrong',
  title = 'Error 404',
  redirect = '/'
}) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
  };
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Modal
      open={isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={'customPopup'}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>
        <Link className={'menuLink'} to={redirect}>
          <Button onClick={() => setIsOpen(false)} className={'redirectBtn'} variant={'outlined'}>Home</Button>
        </Link>
      </Box>
    </Modal>
  );
};

export default Popup;

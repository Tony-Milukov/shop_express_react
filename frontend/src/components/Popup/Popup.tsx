import React, { FC } from 'react';

interface IPopup {
  title: string,
  message: string,
  status: number,
}
const Popup: FC <IPopup>  = ({title ,status,message}) => {
  return (
    <div className={"popup"}>
        <div className={"popupContainer"}>
          <h1>{title} status: {status}</h1>
          <div className="message">{message}</div>
        </div>
    </div>
  );
};

export default Popup;

import React, { FC } from 'react';
interface IErrorProps {
  message: string | boolean,
  condition: boolean
}
const ErrorMsg: FC <IErrorProps> = ({message,condition}) => {
  return (
    <>
      {condition ?
        <span className={'errorMSG'}>{message}</span> : null}
      </>
  );
};

export default ErrorMsg;

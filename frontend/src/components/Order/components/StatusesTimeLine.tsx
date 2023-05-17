import React, { FC, useEffect, useState } from 'react';
import IStatus from '../../../types/status';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Timeline from '@mui/lab/Timeline';
import userStore from '../../../store/userStore';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import checkIsAdmin from '../../../utilits/checkIsAdmin';
interface IStatusesProps {
  statuses?: IStatus[];
  update : () => {},
  orderId?: number | string,
}

const StatusesTimeLine: FC<IStatusesProps> = ({ statuses,update, orderId }) => {
  const token = userStore((state: any) => state.user.token);
  const [isAdmin,setAdmin] = useState<boolean>(false)
  const handleIsAdmin = async () => {
    setAdmin(await checkIsAdmin(token))
  }
  useEffect(() => {
    handleIsAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])
  const deleteOrderStatus = async (statusId:number) => {
    try {
      await axios.delete(`http://localhost:5000/api/order/status/${orderId}/${statusId}`,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      update()
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Timeline position="alternate">
      {
        statuses?.map((status: IStatus) => <TimelineItem key={status.id}>
            <TimelineSeparator>
              <TimelineConnector/>
              <TimelineDot/>
            </TimelineSeparator>
            <TimelineContent>{status.name} {isAdmin ? <DeleteIcon onClick={() => deleteOrderStatus(status.id)}/> : null}</TimelineContent>
          </TimelineItem>
        )
      }

    </Timeline>
  );
};

export default StatusesTimeLine;

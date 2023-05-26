import React, { FC, useEffect, useRef, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import userStore from '../../store/userStore';
import './select.css';

interface IInfinitySelectProps {
  url: string;
  onSelect?: (item:any) => {} | null | void;
}

const CustomInfiniteSelect: FC<IInfinitySelectProps> = ({
    //API url to get data, template request:
    // post.(url, {
    //         page: page,
    //         pageSize,
    //       }
    url,
    onSelect,
  }) => {
    const token = userStore((state: any) => state.user.token);
    const containerRef = useRef(null); // used to calculate end of seen div
    const [items, setItems] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const pageSize: number = 5; // how many items on one time
    const getItems = async () => {
      const { data } = await axios.post(url, {
        page: page,
        pageSize,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setItems([...new Set([...items, ...data.rows])]);
    };
    useEffect(() => {
      getItems();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url, page]);

    const handleScroll = () => {
      const {
        scrollTop,
        clientHeight,
        scrollHeight
      } = containerRef.current!;
      const endScroll = scrollHeight - clientHeight;
      if (endScroll === scrollTop) {
        setPage(page + 1);
      }
    };

    return (
      <div onScroll={handleScroll} ref={containerRef} className={'scrollable infinitySelect'}>
        {
          items?.map(i =>
            <MenuItem onClick={() => onSelect ? onSelect(i) : null} key={i.id}>{i.name}</MenuItem>)
        }
      </div>
    )
      ;
  }
;

export default CustomInfiniteSelect;

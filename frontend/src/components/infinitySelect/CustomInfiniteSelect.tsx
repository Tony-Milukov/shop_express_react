import React, { FC, useEffect, useRef, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import userStore from '../../store/userStore';
import './select.css';

interface IInfinitySelectPROPS {
  url: string;
  onSelect?: (id: number) => {} | null;
}

const CustomInfiniteSelect: FC<IInfinitySelectPROPS> = ({
    url,
    onSelect,
  }) => {
    const token = userStore((state: any) => state.user.token);
    const containerRef = useRef(null);
    const [items, setItems] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>();
    const pageSize = 5;
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
      setHasMore(data.count !== items.length);
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
            <MenuItem onClick={() => onSelect ? onSelect(i.id) : null} key={i.id}>{i.name}</MenuItem>)
        }
        {
          hasMore ? <MenuItem>Loading ...</MenuItem> : null
        }
      </div>
    )
      ;
  }
;

export default CustomInfiniteSelect;

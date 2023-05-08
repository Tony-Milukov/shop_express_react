import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { List, Pagination, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '../../../components/Dialog/Dialog';
import AddButton from './AddButton';
import IITemPanelList from '../../../types/IITemPanelList';
import ListItemAdmin from './panelItems/ListItemAdmin';
import IItemsRequest from '../../../types/itemsRequest';
import userStore from '../../../store/userStore';

interface PanelItemsProps {
  url: string,
  paginationUrl: string,
  name: string,
  ListItem?: any,
  addItem?: boolean,
  children?:any
}

const PanelItems: FC<PanelItemsProps> = ({
  url,
  paginationUrl,
  name,
  ListItem,
  addItem = true,
  children
}) => {
  const [items, setItems] = useState<IItemsRequest>();
  const token = userStore((state: any) => state.user.token);
  const nav = useNavigate();
  const page = (useParams()).page ?? 1;
  const pageSize = 5;
  const location = useLocation();
  const [addErr, setAddErr] = useState<boolean>(false);

  //new value inputted in  dialog
  const [inputValue, setValue] = useState<string>('');
  const getItems = async () => {
    try {
      const { data } = await axios.post<IItemsRequest>(`${url}/all`, {
        pageSize: pageSize,
        page: page
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setItems(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const handlePagination = (event: any, page: number) => {
    nav(`${paginationUrl}/${page}`);
  };
  const handleInput = (e: any) => {
    setValue(e.target.value);
  };
  const addNewItem = async () => {
    setAddErr(false);
    try {

      await axios.put<IItemsRequest>(url, {
        [name]: inputValue,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      await getItems();
    } catch (e) {
      setAddErr(true);
    }
  };
  const renderListItem = (item: IITemPanelList) => {
    //if there was an ListItem given, don't use default one
    if (ListItem) {
      return <ListItem item={item}
        update={getItems} key={item.id}/>;
    }
    return <ListItemAdmin
        deleteUrl={`${url}/${item.id}`} item={item}
        update={getItems} key={item.id}/>;
  };
  return (
    <div className={'brandsMain'}>
      <List className={'customList'}>
        {
          items?.rows?.map((item: IITemPanelList) => renderListItem(item))
        }
      </List>
      {addItem ? <Dialog
        title={`Add new ${name}`}
        OpenButton={AddButton} handler={addNewItem}
        failureValue={'back'} succesValue={'add'}>
        <TextField
          onChange={(e: any) => handleInput(e)}
          id="outlined-multiline-flexible"
          placeholder={'Input new role'}
          multiline
          maxRows={4}
        />
        {addErr && items ? <p className={'errorMSG'}>This Category already exists </p> : null}
        {addErr && !items ? <p className={'errorMSG'}>Please, input a category!</p> : null}

      </Dialog> : null}
      {children}
      <Stack spacing={2}>
        <Pagination
          count={items?.count ? Math.ceil(items.count < pageSize ? 1 : items.count / pageSize) : 0}
          onChange={handlePagination}/>
      </Stack>
    </div>
  );
};

export default PanelItems;

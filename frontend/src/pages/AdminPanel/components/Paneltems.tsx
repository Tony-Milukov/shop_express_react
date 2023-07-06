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
  // The API URL for this action
  url: string,

  // The URL used for pagination or retrieving the next page of data
  paginationUrl: string,

  // The name or type of action being performed (e.g., brand, category, role)
  name: string,

  // Component used to render each item
  ListItem?: any,

  // Indicates whether a dialog menu should be included
  dialog?: boolean,

  // Children components or elements to be included in the dialog menu
  children?:any,

  //Indicates whether add item function should be included, request template: put(props url)
  addItem?: boolean
}

const PanelItems: FC<PanelItemsProps> = ({
  url,
  paginationUrl,
  name,
  ListItem,
  dialog = true,
  addItem=true,
  children,
}) => {
  const [items, setItems] = useState<IItemsRequest>();
  const [err,setErr] = useState<boolean>(false)
  const token = userStore((state: any) => state.user.token);
  const nav = useNavigate();
  const page = (useParams()).page ?? 1;
  const pageSize = 10;
  const location = useLocation();
  const [addItemErr, setAddItemErr] = useState<boolean>(false);

  //new value inputted in  dialog
  const [inputValue, setValue] = useState<string>('');


  const getItems = async () => {
    //get items from the API, request template :
    // put(`${url}/all`, {
    //   pageSize: pageSize,
    //   page: page
    // }
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

  //redirect user on page change, to expected page
  const handlePagination = (event: any, page: number) => {
    nav(`${paginationUrl}/${page}`);
  };
  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  //adding new item, request template:
  // (url, {
  //   [props name]: inputValue,
  // }
  const addNewItem = async () => {
    setAddItemErr(false);
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
      setAddItemErr(true);
    }
  };

  //render items which were gotten from the API,
  // if ListItem was given, will render it, else render ListItemAdmin
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
    <div className={'itemsMain'}>
      {
        !items || items?.rows.length < 1 ? <>No one were defined</> : <>
          <List className={'customList'}>
            {
              items?.rows?.map((item: IITemPanelList) => renderListItem(item))
            }
          </List>
          {dialog ? <Dialog
            title={`Add new ${name}`}
            OpenButton={AddButton} handler={addNewItem}
            failureValue={'back'} succesValue={'add'}>
            {addItem ? <TextField
              onChange={(e: any) => handleInput(e)}
              id="outlined-multiline-flexible"
              placeholder={'Input new role'}
              multiline
              maxRows={4}
            /> : null}
            {addItemErr && !items ? <p className={'errorMSG'}>Please, input a correct value!</p> : null}
            {addItemErr && items ? <p className={'errorMSG'}>Item with this value already exists</p> : null}

            {children}
          </Dialog> : null}
          <Stack spacing={2}>
            <Pagination
              count={items?.count ? Math.ceil(items.count < pageSize ? 1 : items.count / pageSize) : 0}
              onChange={handlePagination}/>
          </Stack>
        </>
      }
    </div>
  );
};

export default PanelItems;

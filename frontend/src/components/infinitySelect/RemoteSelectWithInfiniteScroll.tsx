import { Checkbox, Select } from '@mui/material';
import React, { FC } from 'react';
import MenuItem from '@mui/material/MenuItem';

interface IPickData {
  url: string
}
const RemoteSelectWithInfiniteScroll:FC<IPickData> = () => {
  return (
    <div>
      <Select
        multiple
      >
        <MenuItem value="category1">
            <Checkbox />
          Category 1
        </MenuItem>
      </Select>
      </div>
  );
};

export default RemoteSelectWithInfiniteScroll;

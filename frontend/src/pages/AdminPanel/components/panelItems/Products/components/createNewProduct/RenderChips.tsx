import React, { FC } from 'react';
import { Chip } from '@mui/material';
import IStatus from '../../../../../../../types/status';

interface RenderChipsProps {
  chips: IStatus[],
  handler?: (id: number | string) => void | {} | null
}
const RenderChips: FC <RenderChipsProps> = ({chips,handler}) => {
  return (
    <div className={"chips"}> {
        chips.map((chip: IStatus) => <Chip  key={chip.id} label={chip.name} variant="outlined" onDelete={()=> handler ?  handler(chip.id) : null }/>)
      }
    </div>
  );
};

export default RenderChips;

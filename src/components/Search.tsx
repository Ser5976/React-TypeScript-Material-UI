import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import { SetSearchValueActionType } from '../store/reducers/moviesReducer';

//типизация----------------------------------
type PropsType = {
  searchValue: string;
  setSearchValue: (data: string) => SetSearchValueActionType;
  callSearch: () => void;
};
//-------------------------------------------

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '75%',
      margin: 'auto',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },

    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

const Search: React.FC<PropsType> = ({
  searchValue,
  setSearchValue,
  callSearch,
}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="название фильма на английском языке"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={callSearch}
      >
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
};
export default Search;

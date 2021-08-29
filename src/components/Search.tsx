import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
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
      margin: '25px auto',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },

    iconButton: {
      padding: 10,
    },
    divider: {
      height: 45,
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
    <div className={classes.root}>
      <TextField
        id="outlined-basic"
        label="Поиск"
        variant="outlined"
        className={classes.input}
        placeholder="название фильма на английском языке"
        inputProps={{ 'aria-label': 'search google maps' }}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton
                color="primary"
                className={classes.iconButton}
                aria-label="directions"
                onClick={callSearch}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
export default Search;

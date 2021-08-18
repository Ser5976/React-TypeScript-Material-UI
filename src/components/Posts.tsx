import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  makeStyles,
  Grid,
  MenuItem,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import { PostsType } from '../store/reducers/postsReducer';

//типизация---------------------------------------------------------------------
type Position = {
  value: string;
  name: string;
};
// типизация пропсов
type PropsType = {
  sortedAndSearchedPosts: PostsType[];
  isFetching: boolean;
  isFetchError: boolean;
  selectedSort: string;
  searchQuery: string;
  handleSelectChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
//-----------------------------------------------------------------
const position: Array<Position> = [
  { value: 'title', name: 'По названию' },
  { value: 'body', name: 'По описанию' },
];
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 850,
    margin: `${theme.spacing(1)}px auto`,
  },
  grid: {
    maxWidth: 850,
    margin: `${theme.spacing(5)}px auto`,
  },
  textField: {
    minWidth: 250,
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textTitle: {
    fontSize: '25px',
    textShadow: '1px 1px #9a0036',
    color: '#9a0036',
    marginBottom: '25px',
    marginTop: '25px',
  },
}));

const Posts: React.FC<PropsType> = ({
  sortedAndSearchedPosts,
  isFetching,
  isFetchError,
  selectedSort,
  searchQuery,
  handleSelectChange,
  handleInput,
}) => {
  const classes = useStyles();

  return (
    <>
      {isFetchError ? (
        <Typography align="center" className={classes.textTitle}>
          Что-то пошло не так!
        </Typography>
      ) : isFetching ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ height: window.innerHeight - 65.6 }}
        >
          <CircularProgress disableShrink />
        </Box>
      ) : (
        <div style={{ marginTop: '50px' }}>
          <Typography align="center" className={classes.textTitle}>
            JSONPlaceholder/posts
          </Typography>
          <Grid container className={classes.grid}>
            <Grid item xs={6}>
              <TextField
                select
                label="Сортировка"
                value={selectedSort}
                onChange={handleSelectChange}
                className={classes.textField}
              >
                {position.map((option) => {
                  return (
                    <MenuItem value={option.value} key={option.value}>
                      {option.name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <TextField
                className={classes.textField}
                label="Поиск..."
                value={searchQuery}
                onChange={handleInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          {sortedAndSearchedPosts.map((item, index) => {
            return (
              <Card className={classes.root} key={index}>
                <CardHeader
                  avatar={<Avatar>{item.userId}</Avatar>}
                  title={item.title}
                />

                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {item.body}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Posts;

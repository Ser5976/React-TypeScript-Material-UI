import React, { useEffect, useState, useMemo } from 'react';
import { fetchPosts } from '../action/fetchPosts'; // запрос для получения постов
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
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
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
// типизация селекта
type Position = {
  value: string;
  name: string;
};
// типизация пропсов
type MapStateToPropsType = {
  posts: PostsType[];
  isFetching: boolean;
  isFetchError: boolean;
};
type MapDispathPropsType = {
  fetchPosts: () => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
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

const PostsCotainer: React.FC<PropsType> = ({
  fetchPosts,
  posts,
  isFetching,
  isFetchError,
}) => {
  useEffect(() => {
    fetchPosts(); // запрос, все посты

    // eslint-disable-next-line
  }, []);
  const classes = useStyles();

  const [selectedSort, setSelectedSort] = useState(''); // состояние используем для сортировки
  const [searchQuery, setSearchQuery] = useState(''); // состояние используем для поиска
  //сортировка поста, используем useMemo, чтобы сортировка запускалась тогда,когда нужно(оптимизация),похожe на  use Effect
  const sortedPosts = useMemo(() => {
    //console.log('отработала');
    if (selectedSort) {
      return [...posts].sort((a: any, b: any) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    } else {
      return posts;
    }
  }, [selectedSort, posts]);
  //  поиск, тотже принцип
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
  }, [searchQuery, sortedPosts]);

  // обработка селекта,запись значения в selectedSort, нужно для сортировки
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedSort(e.target.value);
  };
  // обработка инпута,запись значения в searchQuery,нужно для поиска
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

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

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    posts: state.posts.posts, //массив постов
    isFetching: state.posts.isFetching, //крутилка
    isFetchError: state.posts.isFetchError, //ошибка
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { fetchPosts })(PostsCotainer);

import React, { useEffect } from 'react';
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
import { Container, makeStyles, Typography } from '@material-ui/core';
import Masonry from 'react-masonry-css';
import {
  setSearchValue,
  SetSearchValueActionType,
} from '../store/reducers/moviesReducer';
import Search from '../components/Search';
import MovieCard from '../components/MovieCard';
import { getMovies, getSearchMovies } from '../action/moviesAction';
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
type MapStateToPropsType = {
  searchValue: string;
  movies: any[];
  loading: boolean;
  errorMessage: string | null;
};
type MapDispathPropsType = {
  setSearchValue: (data: string) => SetSearchValueActionType;
  getMovies: () => void;
  getSearchMovies: () => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
//-----------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {},
  textTitle: {
    fontSize: '20px',
    textShadow: '1px 1px #9a0036',
    color: '#9a0036',
    marginTop: '25px',
  },
}));

const MoviesContainer: React.FC<PropsType> = ({
  searchValue, //сам запрос
  movies, //массив фильмов
  loading, // крутилка
  errorMessage, // если не  нашли информации по запросу
  getMovies, // базовый запрос фильмов
  getSearchMovies, //запрос фильмов
  setSearchValue, // запись запроса в стейт
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (movies.length !== 0) {
      return;
    } else {
      getMovies();
    }
    // eslint-disable-next-line
  }, []);
  const callSearch = () => {
    getSearchMovies();
    setSearchValue('');
  };
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  return (
    <Container>
      <Search
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        callSearch={callSearch}
      />
      {loading && !errorMessage ? (
        <span>loading...</span>
      ) : errorMessage ? (
        <Typography align="center" className={classes.textTitle}>
          {errorMessage}
        </Typography>
      ) : (
        <>
          <Typography align="center" className={classes.textTitle}>
            Sharing a few of our favourite movies
          </Typography>

          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {movies.map((movie, index) => {
              return (
                <div key={index}>
                  <MovieCard movie={movie} />
                </div>
              );
            })}
          </Masonry>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    searchValue: state.movies.searchValue,
    movies: state.movies.movies,
    loading: state.movies.loading,
    errorMessage: state.movies.errorMessage,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { setSearchValue, getMovies, getSearchMovies })(
  MoviesContainer
);

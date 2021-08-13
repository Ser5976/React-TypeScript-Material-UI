import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
import { Container, makeStyles, Typography, Grid } from '@material-ui/core';
import { getSelectedMovies } from '../action/moviesAction';
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
type MapStateToPropsType = {
  selectedMovie: any;
  loading: boolean;
};
type MapDispathPropsType = {
  getSelectedMovies: (imdbID: string) => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
type ParamsType = {
  imdbID: string;
};
//-----------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {},
  textTitle: {
    fontSize: '20px',
    textShadow: '1px 1px #9a0036',
    color: '#9a0036',
    margin: '25px auto',
  },
  image: {
    width: 345,
    height: 500,
  },
  italic: {
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: 'bold',
  },
}));

const MoviesContainer: React.FC<PropsType> = ({
  selectedMovie,
  getSelectedMovies,
}) => {
  const classes = useStyles();
  const { imdbID } = useParams<ParamsType>(); //  хук роутера ,который помогает получить значение params

  console.log(selectedMovie);
  const {
    Title,
    Poster,
    Year,
    Country,
    Genre,
    Runtime,
    Language,
    Director,
    Actors,
    Plot,
    Awards,
    Ratings,
    imdbRating,
  } = selectedMovie;
  useEffect(() => {
    getSelectedMovies(imdbID); // базовый запрос фильмов
    // eslint-disable-next-line
  }, []);
  let rat: any;
  Ratings ? (rat = [...Ratings]) : (rat = []);
  //console.log(rat);
  return (
    <Container>
      <Typography align="center" className={classes.textTitle}>
        {Title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography>
            <span className={classes.bold}>Year</span>:
            <span className={classes.italic}> {Year}</span>
          </Typography>
          <Typography>
            <span className={classes.bold}>Country</span>:
            <span className={classes.italic}> {Country}</span>
          </Typography>
          <Typography>
            <span className={classes.bold}>Genre</span>:
            <span className={classes.italic}> {Genre}</span>
          </Typography>
          <Typography>
            <span className={classes.bold}>Runtime</span>:
            <span className={classes.italic}> {Runtime}</span>
          </Typography>
          <Typography style={{ marginTop: '25px' }}>
            <span className={classes.bold}>Language</span>:
            <span className={classes.italic}> {Language}</span>
          </Typography>
          <Typography style={{ marginTop: '25px' }}>
            <span className={classes.bold}>Director</span>:
            <span className={classes.italic}> {Director}</span>
          </Typography>
          <Typography style={{ marginTop: '25px' }}>
            <span className={classes.bold}>Actors</span>:
            <span className={classes.italic}> {Actors}</span>
          </Typography>
          <Typography style={{ marginTop: '25px' }}>
            <span className={classes.bold}>Plot</span>:
            <span className={classes.italic}> {Plot}</span>
          </Typography>
          <Typography style={{ marginTop: '25px' }}>
            <span className={classes.bold}>Awards</span>:
            <span className={classes.italic}> {Awards}</span>
          </Typography>
          <Typography style={{ marginTop: '25px' }}>
            <span className={classes.bold}>Ratings</span>:
          </Typography>
          {rat.map((item: any, index: any) => {
            return (
              <Typography style={{ marginLeft: '25px' }} key={index}>
                <span className={classes.bold}>{item.Source}</span>:
                <span className={classes.italic}> {item.Value}</span>
              </Typography>
            );
          })}
          <Typography style={{ marginTop: '25px' }}>
            <span className={classes.bold}>imdbRating</span>:
            <span className={classes.italic}> {imdbRating}</span>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img className={classes.image} alt="complex" src={Poster} />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    selectedMovie: state.movies.selectedMovie,
    loading: state.movies.loading,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { getSelectedMovies })(MoviesContainer);

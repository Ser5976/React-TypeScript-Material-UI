import React, { useEffect } from 'react';
import { PhotosListType } from '../store/reducers/photosListReducer';
import { fetchPhotos } from '../action/fetchPhotos'; // запрос для получения photos
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
import { Box, Paper, Grid, Typography, makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
type MapStateToPropsType = {
  photosList: PhotosListType[];
  isFetching: boolean;
  isFetchError: boolean;
};
type MapDispathPropsType = {
  fetchPhotos: () => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
//-----------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  textTitle: {
    fontSize: '25px',
    textShadow: '1px 1px #9a0036',
    color: '#9a0036',
    marginBottom: '25px',
    marginTop: '25px',
  },
}));

const PhotosListCotainer: React.FC<PropsType> = ({
  fetchPhotos,
  photosList,
  isFetching,
  isFetchError,
}) => {
  const classes = useStyles();
  useEffect(() => {
    fetchPhotos(); // запрос

    // eslint-disable-next-line
  }, []);

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
            JSONPlaceholder/photos
          </Typography>
          {photosList.map((item, index) => {
            return (
              <div className={classes.root} key={index}>
                <Paper className={classes.paper}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <img
                        src={item.thumbnailUrl}
                        alt="ghbdtn"
                        style={{
                          width: '50px',
                          height: 'auto',
                        }}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body2">{item.title}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    photosList: state.photosList.photosList, //массив photos
    isFetching: state.photosList.isFetching, //крутилка
    isFetchError: state.photosList.isFetchError,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { fetchPhotos })(PhotosListCotainer);

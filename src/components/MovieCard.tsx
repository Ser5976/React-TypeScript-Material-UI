import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { useHistory } from 'react-router-dom';

//типизация----------------------
type PropsType = {
  movie: any;
};
//---------------------------------

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
});

const MovieCard: React.FC<PropsType> = ({ movie }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={movie.Poster}
          title={movie.Title}
          onClick={() => {
            history.push(`/profile/${movie.imdbID}`);
          }}
        />
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;

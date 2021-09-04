import React from 'react';
import { makeStyles, Avatar, Box, Typography } from '@material-ui/core';

// типизация пропсов
type PropsType = {
  username: string;
  id: string;
  index: number;
};
//-----------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 850,
    margin: `${theme.spacing(1)}px auto`,
    //backgroundColor: '#f3e5f5',
    display: 'flex',
    border: '1px solid',

    padding: 15,
  },
  div: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: 10,
  },
}));

const User: React.FC<PropsType> = ({ username, id, index }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.root} key={index}>
        <Avatar src="/broken-image.jpg" className={classes.avatar} />
        <div className={classes.div}>
          <Typography component="h1" variant="h6">
            {username}
          </Typography>
        </div>
      </Box>
    </>
  );
};

export default User;

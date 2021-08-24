import React from 'react';
import { makeStyles, Card, CardHeader, Avatar } from '@material-ui/core';

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
    backgroundColor: '#f3e5f5',
  },
}));

const User: React.FC<PropsType> = ({ username, id, index }) => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root} key={index}>
        <CardHeader
          avatar={<Avatar src="/broken-image.jpg" />}
          title={username}
        />
      </Card>
    </>
  );
};

export default User;

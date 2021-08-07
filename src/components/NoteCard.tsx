import {
  Card,
  CardHeader,
  CardMedia,
  Avatar,
  CardContent,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
//import Parmskay from '../img/parmskay.jpg';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import { NoteType } from '../store/reducers/notesReducer';
import { useHistory } from 'react-router-dom';
import { ROOT_URL } from '../constant/urls';
//типизация----------------------
type PropsType = {
  note: NoteType;
  removeNote: (id: number | undefined) => void;
  editNote: (id: number | undefined) => void;
};
//---------------------------------
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: (note: NoteType): string => {
      if (note.category == 'Итальянская кухня') {
        return '#4caf50';
      }
      if (note.category == 'Французская кухня') {
        return '#ffeb3b';
      }
      if (note.category == 'Китайская кухня') {
        return '#f57f17';
      }
      return '#1a237e';
    },
  },
  menu: {
    marginTop: '50px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

const NoteCard: React.FC<PropsType> = ({ note, removeNote, editNote }) => {
  // console.log(note.picture);
  const classes = useStyles(note);
  const history = useHistory();
  // для меню
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={(event) => {
                handleOpenMenu(event);
                editNote(note._id);
              }}
            >
              <MoreVertIcon style={{ color: '#1a237e' }} />
            </IconButton>
          }
          avatar={
            <Avatar className={classes.avatar}>
              {note.category && note.category[0].toUpperCase()}
            </Avatar>
          }
          title={note.title}
          subheader={note.category}
        />
        <CardMedia
          className={classes.media}
          image={note.picture ? `${ROOT_URL}/${note.picture}` : 'картинка'}
          title={note.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {note.detalis}
          </Typography>
        </CardContent>
      </Card>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem onClick={handleClose}>
          <IconButton onClick={() => history.push('/muiForm')}>
            <EditIcon style={{ color: '#1a237e' }} />
          </IconButton>

          <IconButton onClick={() => removeNote(note._id)}>
            <DeleteOutlinedIcon style={{ color: '#9a0036' }} />
          </IconButton>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NoteCard;

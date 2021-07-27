import React, { useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  Container,
  TextField,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon,
  Checkbox,
  Divider,
  Typography,
  Box,
} from '@material-ui/core';
import {
  TodoListType, // тип, типизирует отдельный объект списка
  SetTitleActionType, //тип, типизирует setTitle
  setTitle, //action,добавляет значение инпута в объект
} from '../store/reducers/todoListReducer';
import {
  getTodoList, // получение спика дел
  sendTodoList, // добавление дела в список дел
  deleteTodo, //удаление дела из спика дел
  setMade, //изменяет  объект, в котором изменился  made, на серваке
} from '../action/todoListAction';
import { RootStateType } from '../store/store'; // тип всего стейта( для типизации state)
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
//типизация---------------------------------------------------------------------
type MapStateToPropsType = {
  todoList: TodoListType[];
  title: string;
  isFetching: boolean;
  isFetchError: boolean;
};
type MapDispathPropsType = {
  setTitle: (value: string) => SetTitleActionType;
  getTodoList: () => void;
  sendTodoList: (data: TodoListType) => void;
  deleteTodo: (id: number) => void;
  setMade: (id: number, todo: TodoListType) => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
// -----------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  container: {
    padding: '50px 200px',
  },
  list: { marginTop: '30px' },
  listitemtext: {
    color: 'red',
  },
  textField: {
    marginBottom: '15px',
  },
  textTitle: {
    fontSize: '25px',
    textShadow: '1px 1px #9a0036',
    color: '#9a0036',
    marginTop: '25px',
  },
}));

const TodoListContainer: React.FC<PropsType> = ({
  todoList, //список дел
  title, //заголовок списка дел
  isFetching, // крутилка
  isFetchError, // ошибка
  setTitle, //запись значения инпута в стейт(title)
  getTodoList, //запрос на сервак, список дел
  sendTodoList, //отправить объект списка дел на сервак
  deleteTodo, // удалить дело
  setMade, // изменяет  объек, в котором изменился  made, на серваке
}) => {
  const classes = useStyles();
  // запрос на сервак, список дел
  useEffect(() => {
    getTodoList();
    // eslint-disable-next-line
  }, []);

  // создаём объект списка дел, передаём его в санку
  const addList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && title !== '') {
      const todo = { title: title, id: Math.random(), made: false };
      sendTodoList(todo);
      setTitle('');
    }
  };
  // пример типизации событий
  const deleteList = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault(); // это чтобы при удалении элемента списка, выделенный checkbox не передавался следующему
    deleteTodo(id);
  };
  //изменяем булевое значение чекбокса и передаём объек, в котором изменился made, в санку
  const handleChange = (id: number) => {
    todoList.map((item) => {
      if (item.id === id) {
        item.made = !item.made;
      }
      return item;
    });
    const todo = todoList.filter((item) => item.id === id);
    const todoObject = todo[0];
    setMade(id, todoObject);
  }; //жуть конечно,но получил этот долбанный объект и передал в санку

  // отправляем значение инпута в стор(это title)
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <>
      <Container fixed className={classes.container}>
        <TextField
          label="Введите название дела"
          helperText="Для добавления нажмите Enter"
          fullWidth
          value={title}
          onChange={handleInput}
          onKeyPress={addList} //событие на нажатия клавиатуры
          className={classes.textField}
        />
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
        ) : todoList.length === 0 ? (
          <Typography align="center" className={classes.textTitle}>
            Пока дел нет!
          </Typography>
        ) : (
          <Typography align="center" className={classes.textTitle}>
            Список дел!
          </Typography>
        )}
        <List
          component="nav"
          aria-label="secondary mailbox folders"
          className={classes.list}
        >
          {todoList.map((item, index) => {
            return (
              <div key={index}>
                <ListItem button>
                  <ListItemIcon>
                    <Checkbox
                      color="primary"
                      onChange={() => handleChange(item.id)}
                      checked={item.made}
                    />
                  </ListItemIcon>
                  {!item.made ? (
                    <ListItemText primary={item.title} />
                  ) : (
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography style={{ color: 'green' }}>
                          {item.title}
                        </Typography>
                      }
                    />
                  )}

                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={(e) => deleteList(e, item.id)}
                  >
                    <DeleteIcon style={{ color: '#9a0036' }} />
                  </IconButton>
                </ListItem>
                <Divider />
              </div>
            );
          })}
        </List>
      </Container>
    </>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    todoList: state.todoList.todoList,
    title: state.todoList.title,
    isFetching: state.todoList.isFetching, //крутилка
    isFetchError: state.todoList.isFetchError,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, {
  setMade,
  setTitle,
  getTodoList,
  sendTodoList,
  deleteTodo,
})(TodoListContainer);

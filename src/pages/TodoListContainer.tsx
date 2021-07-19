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
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  setTodoList, //action, изменяет список дел
  TodoListType, // тип, типизирует отдельный объект списка
  SetTodoListActionType, // тип, типизирует  setTodoList
  deleteTodoList, // action, удаляет дело в списке
  DeleteTodoListActionType, // тип, типизирует  deleteTodoList
  SetMadeActionType, // тип, типизирует setMade
  SetTitleActionType, //тип, типизирует setTitle
  setMade, //action, изменяет ,булевое значение(чекбокс)
  setTitle, //action,добавляет значение инпута в объект
} from '../store/reducers/todoListReducer';
import { RootStateType } from '../store/store'; // тип всего стейта( для типизации state)

//типизация---------------------------------------------------------------------
type MapStateToPropsType = {
  todoList: TodoListType[];
  title: string;
};
type MapDispathPropsType = {
  setTodoList: (data: TodoListType[]) => SetTodoListActionType;
  deleteTodoList: (id: number) => DeleteTodoListActionType;
  setMade: (id: number) => SetMadeActionType;
  setTitle: (value: string) => SetTitleActionType;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
//-----------------------------------------------------------------
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
  },
}));

const TodoListContainer: React.FC<PropsType> = ({
  todoList,
  title,
  setTodoList,
  deleteTodoList,
  setMade,
  setTitle,
}) => {
  const classes = useStyles();
  // берём данные из localStorage и добавляем их в стор
  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem('todoList') || '[]'
    ) as TodoListType[];
    setTodoList(saved);
    // eslint-disable-next-line
  }, []);
  // сохранение данных в localStorage
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);
  // создаём объект,добавляем в созданный массив и меняем массив в сторе на новый
  const addList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const todo = { title: title, id: Math.random(), made: false };
      const newTodoList = [...todoList, todo];
      setTodoList(newTodoList);
      setTitle('');
    }
  };
  // пример типизации событий
  const deleteList = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault(); // это чтобы при удалении элемента списка, выделенный checkbox не передавался следующему
    deleteTodoList(id);
  };
  //изменяем булевое значение чекбокса
  const handleChange = (id: number) => {
    setMade(id);
  };
  // отправляем значение инпута в стор
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
        {todoList.length === 0 ? (
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
        <footer>
          <Typography
            align="center"
            color="textSecondary"
            component="p"
            variant="subtitle1"
          >
            nkjfdgfdlkmslgnmlg
          </Typography>
        </footer>
      </Container>
    </>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    todoList: state.todoList.todoList,
    title: state.todoList.title,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown,
  RootStateType
>(mapStateToProps, { setTodoList, deleteTodoList, setMade, setTitle })(
  TodoListContainer
);

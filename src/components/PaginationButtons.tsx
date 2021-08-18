import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';

// типизация пропсов
type PropsType = {
  fetchPosts: (pageNumber: number) => void;
  totalCount: number;
  limit: number;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
    },
  })
);

const PaginationButtons: React.FC<PropsType> = ({
  fetchPosts,
  limit,
  totalCount,
}) => {
  const classes = useStyles();
  let countPage: number = Math.ceil(totalCount / limit);
  console.log(countPage);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchPosts(value);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={countPage}
        showFirstButton
        showLastButton
        onChange={handleChange}
      />
    </div>
  );
};
export default PaginationButtons;

import React, { useEffect, useState, useMemo } from 'react';
import { fetchPosts } from '../action/fetchPosts'; // запрос для получения постов
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
import { PostsType } from '../store/reducers/postsReducer'; //типизация поста
import Posts from '../components/Posts';
import { connect } from 'react-redux';
import PaginationButtons from '../components/PaginationButtons';

//типизация---------------------------------------------------------------------
// типизация пропсов
type MapStateToPropsType = {
  posts: PostsType[];
  isFetching: boolean;
  isFetchError: boolean;
  totalCount: number;
  limit: number;
};
type MapDispathPropsType = {
  fetchPosts: (pageNumber: number) => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
//-----------------------------------------------------------------

const PostsCotainer: React.FC<PropsType> = ({
  fetchPosts,
  posts,
  isFetching,
  isFetchError,
  totalCount,
  limit,
}) => {
  useEffect(() => {
    fetchPosts(1); // запрос, все посты

    // eslint-disable-next-line
  }, []);

  const [selectedSort, setSelectedSort] = useState(''); // состояние используем для сортировки
  const [searchQuery, setSearchQuery] = useState(''); // состояние используем для поиска
  //сортировка поста, используем useMemo, чтобы сортировка запускалась тогда,когда нужно(оптимизация).useMemo кэширует данные и если зависимости не изменились берёт результат из кэша
  const sortedPosts = useMemo(() => {
    //console.log('отработала');
    if (selectedSort) {
      return [...posts].sort((a: any, b: any) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    } else {
      return posts;
    }
  }, [selectedSort, posts]);
  //  поиск, тотже принцип
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
  }, [searchQuery, sortedPosts]);

  // обработка селекта,запись значения в selectedSort, нужно для сортировки
  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedSort(e.target.value);
  };
  // обработка инпута,запись значения в searchQuery,нужно для поиска
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Posts
        sortedAndSearchedPosts={sortedAndSearchedPosts}
        isFetching={isFetching}
        isFetchError={isFetchError}
        handleSelectChange={handleSelectChange}
        handleInput={handleInput}
        selectedSort={selectedSort}
        searchQuery={searchQuery}
      />
      <PaginationButtons
        fetchPosts={fetchPosts}
        totalCount={totalCount}
        limit={limit}
      />
    </>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    posts: state.posts.posts, //массив постов
    isFetching: state.posts.isFetching, //крутилка
    isFetchError: state.posts.isFetchError, //ошибка
    totalCount: state.posts.totalCount,
    limit: state.posts.limit,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { fetchPosts })(PostsCotainer);

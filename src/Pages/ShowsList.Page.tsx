import { FC } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../store";
import {
  showsLoadingSelector,
  showsQuerySelector,
  showsSelector,
} from "../Selectors/shows";
import LoadingSpinner from "../Components/LoadingSpinner";
import { showSliceQueryAction } from "../Slice/Show";

type ShowListPageProps = {} & ReduxProps;

const ShowListPage: FC<ShowListPageProps> = ({
  shows,
  showsQuery,
  loading,
}) => {
  return (
    <div className="mt-2">
      <div className=" flex justify-center">
        <SearchBar
          onChange={(event) => {
            showsQuery(event.target.value);
          }}
        />
        {loading && <LoadingSpinner />} 
      </div>
      {shows && (
        <div className="flex flex-wrap justify-center">
          {shows.map((items) => {
            return <ShowCard key={items.id} show={items} />;
          })}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: State) => {
  return {
    shows: showsSelector(state),
    query: showsQuerySelector(state),
    loading: showsLoadingSelector(state),
  };
};

const mapDispatchToProps = {
  showsQuery: showSliceQueryAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);

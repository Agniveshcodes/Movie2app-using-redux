import { FC } from "react";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { showsQueryAction } from "../Actions/Shows";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../store";
import { showsLoadingSelector, showsQuerySelector, showsSelector } from "../Selectors/shows";
import LoadingSpinner from "../Components/LoadingSpinner";

type ShowListPageProps = {} & ReduxProps;

const ShowListPage: FC<ShowListPageProps> = ({ shows, query, showsQuery , loading}) => {
  return (
    <div className="mt-2">
      <div className=" flex justify-center">
      <SearchBar
        value={query}
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
    loading: showsLoadingSelector(state)
  };
};

const mapDispatchToProps = {
  showsQuery: showsQueryAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ShowListPage);

import { FC, useEffect } from "react";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { connect, ConnectedProps } from "react-redux";
import { State } from "../store";
import { showsMapSelector } from "../Selectors/shows";
import LoadingSpinner from "../Components/LoadingSpinner";
import CastCard from "../Components/CastCard";
import { castMapSelector, castsNormalisedSelector } from "../Selectors/casts";
import { loadSliceShowAction } from "../Slice/Show";
import { castSliceDetailLoadAction, castSliceLoadAction } from "../Slice/Cast";

type ownProps = WithRouterProps;

type ShowDetailPageProps = ReduxProps & ownProps;

const placeholderImage =
  "https://images.unsplash.com/photo-1556888335-23631cd2801a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGxhY2Vob2xkZXJ8ZW58MHx8MHx8fDA%3D";

const ShowDetailPage: FC<ShowDetailPageProps> = ({
  params,
  show,
  loadShow,
  casts,
  cast,
  laodCast2,
}) => {
  console.log("cast is ", cast);
  console.log("show is ", show);

  useEffect(() => {
    loadShow(+params.showId);
    laodCast2(+params.showId);
    // fetchCast2(+params.showId).then((res)=> {
    //   return laodCast(res)
    // })
  }, [params.showId]);

  if (!show) {
    return <LoadingSpinner className="text-3xl m-4 " />;
  }

  return (
    <div className="mt-2">
      <Link to={"/"} className=" w-10 font-semibold">
        {" "}
        <IoMdArrowRoundBack className="text-2xl" />{" "}
      </Link>
      <h2 className="text-4xl font-semibold tracking-wide"> {show.name} </h2>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {show.genres.map((items) => {
          return <GenrePill name={items} key={items} />;
        })}
      </div>
      <div className="mt-2 flex">
        <img
          src={show.image?.medium || show.image?.original || placeholderImage}
          alt=""
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          <p
            className="text-md font-semibold"
            dangerouslySetInnerHTML={{ __html: show.summary || "" }}
          ></p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating:{" "}
            <span className="text-gray-700">
              {" "}
              {show.rating.average || "rating not available "}/10
            </span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap">
          {casts.length === 0 ? (
            <LoadingSpinner className="text-xl " />
          ) : (
            casts.map((items) => {
              return (
                <CastCard
                  key={items.id}
                  name={items.name}
                  avatarLink={
                    items.image?.medium ||
                    items.image?.original ||
                    placeholderImage
                  }
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: ownProps) => {
  return {
    show: showsMapSelector(state)[+ownProps.params.showId!],
    casts: castsNormalisedSelector(state),
    cast: castMapSelector(state)[+ownProps.params.showId!],
  };
};

const mapDispatchToProps = {
  loadShow: loadSliceShowAction,
  laodCast: castSliceLoadAction,
  laodCast2: castSliceDetailLoadAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default withRouter(connector(ShowDetailPage));

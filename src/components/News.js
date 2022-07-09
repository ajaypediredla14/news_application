import React, { Component } from "react";
import { withRouter } from "../common/withRouter";
import { connect } from "react-redux";
import { setFavorites, setSourceRequested } from "../store/NewsActions";
import { ReactComponent as StarIcon } from "../assets/svgs/star-solid.svg";
import load from "../assets/svgs/load.svg";

class News extends Component {
  constructor() {
    super();
    this.state = {
      current_headline: 0,
      favorites: [],
      isHover: false,
    };
    this.dateFormat = this.dateFormat.bind(this);
    this.addFavorites = this.addFavorites.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
    this.handleCurrentHeadline = this.handleCurrentHeadline.bind(this);
  }

  //setting current headline to display in 3rd section
  handleCurrentHeadline(index) {
    this.setState((prev) => {
      return {
        ...prev,
        current_headline: [index],
      };
    });
  }

  // date formatting
  dateFormat = (date) => {
    let x = new Date(date);
    return (
      "date",
      ("0" + x.getDate()).slice(-2) +
        "/" +
        ("0" + (parseInt(x.getMonth()) + 1)).slice(-2) +
        "/" +
        x.getFullYear()
    );
  };

  //checking whther news headline is in favorite or not
  isFavorite = (index) => {
    const { news, favorites } = this.props;
    let isExists = favorites.findIndex(
      (favorite) =>
        favorite.title.toLowerCase() === news[index].title.toLowerCase()
    );
    if (isExists > -1) {
      return true;
    } else {
      return false;
    }
  };

  //adding news headlines to favorites
  addFavorites = (index) => {
    const { news, favorites } = this.props;
    const tempFavorites = [...favorites];
    let isExists = favorites.findIndex(
      (favorite) =>
        favorite.title.toLowerCase() === news[index].title.toLowerCase()
    );
    if (isExists > -1) {
      console.log("removed");
      tempFavorites.splice(isExists, 1);
    } else {
      tempFavorites.push(news[index]);
    }
    console.log("fav", tempFavorites);
    this.props.setFavorites({
      tempFavs: tempFavorites,
      isFavs: this.props.toggle[1].status,
    });
  };

  render() {
    //destructuring props and state
    const { news, isLoading, toggle } = this.props;
    const { current_headline } = this.state;
    return !isLoading ? (
      <>
        {/* {checking whether selected source has any articles or not} */}
        {news.length > 0 ? (
          <div className="flex flex-col gap-4 lg:flex-row ">
            <div className="flex flex-col lg:w-[50%] w-[100%] items-start justify-start">
              <h1 className="font-semibold text-2xl text-start p-1 font-poppins text-[#017668]">
                {news[current_headline]?.source.name}
              </h1>
              <ul className="text-start divide-y scrollbar lg:max-h-[86vh] max-h-[30vh] overflow-y-scroll w-full">
                {/* {mapping over articles of selected source} */}
                {news.map((news, index) => (
                  <li
                    key={`news-${index}`}
                    className="flex  justify-center cursor-pointer items-start text-start p-2 hover:bg-[#ECF9F7] "
                    onClick={() => this.handleCurrentHeadline(index)}
                  >
                    <img
                      src={news.urlToImage}
                      className="md:w-32 md:h-20 w-20 h-14"
                      alt="img"
                      loading="lazy"
                      title="Headline"
                    />
                    <div className="flex px-2 flex-col max-w-[300px]">
                      <p className="text-sm">{news.title}</p>
                      <p>Published at : {this.dateFormat(news.publishedAt)}</p>
                    </div>
                    <StarIcon
                      title="Favorites"
                      onClick={() => this.addFavorites(index)}
                      alt="Star"
                      // onMouseEnter={() => this.setState({ isHover: true })}
                      // onMouseLeave={() => this.setState({ isHover: false })}
                      // height="20"
                      fill={this.isFavorite(index) ? "red" : "gray"}
                      stroke="#000"
                      className="cursor-pointer min-w-[30px] min-h-[30px] ml-auto pr-2 h-[30px] w-[30px]"
                    />
                  </li>
                ))}
              </ul>
            </div>
            {/* {section -3 showing particular headline in detail} */}
            <div className="flex p-3 flex-col lg:w-[50%] w-[100%] items-start justify-star">
              <div className="flex text-start items-center justify-between w-full py-2">
                <p className="font-bold text-sm w-[80%] font-poppins text-[#017668]">
                  {news[current_headline]?.title}
                </p>
                <StarIcon
                  title="Favorites"
                  onClick={() => this.addFavorites(current_headline)}
                  alt="Star"
                  // onMouseEnter={() => this.setState({ isHover: true })}
                  // onMouseLeave={() => this.setState({ isHover: false })}
                  height="20"
                  fill={this.isFavorite(current_headline) ? "red" : "gray"}
                  stroke="#000"
                  className="cursor-pointer"
                />
              </div>
              <>
                <img
                  src={news[current_headline]?.urlToImage}
                  alt="img"
                  loading="lazy"
                  title="Headline"
                />
                <p>{news[current_headline]?.content}</p>
              </>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center text-lg font-semibold font-poppins w-full h-[500px]">
            <p>No news headlines available</p>
          </div>
        )}
      </>
    ) : (
      <div className="flex w-full items-center justify-center h-full">
        <img
          alt="loading"
          src={load}
          className="animate-spin mr-2 w-6 h-6"
          loading="lazy"
        />
      </div>
    );
  }
}

//accessing redux store
const mapStateToProps = (NewsReducer) => {
  return {
    sources: NewsReducer.sources,
    news: NewsReducer.news,
    favorites: NewsReducer.favorites,
    isLoading: NewsReducer.isLoading,
    current_source: NewsReducer.current_source,
  };
};

// dispatching actions
const mapDispatchToProps = (dispatch) => {
  return {
    setSourceRequested: (data) => dispatch(setSourceRequested(data)),
    setFavorites: (data) => dispatch(setFavorites(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(News));

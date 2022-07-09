import React, { Component } from "react";
import { withRouter } from "../common/withRouter";
import { connect } from "react-redux";
import { setSourceRequested, setSourceSuccess } from "../store/NewsActions";

class Sources extends Component {
  constructor() {
    super();
    this.handleSingleSource = this.handleSingleSource.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { sources } = this.props;
    if (prevProps.sources.length !== sources.length) {
      this.props.setSourceRequested({ id: sources[0].id, index: 0 });
    }
  }

  //set current source news to display
  handleSingleSource(id, index) {
    this.props.setSourceRequested({ id, index });
  }

  render() {
    //destructuring props
    const {
      sources,
      favorites,
      handleToggle,
      toggle,
      setSourceSuccess,
    } = this.props;
    return (
      <div className="flex justify-start items-center w-full">
        <div className="flex flex-col text-start w-full items-start justify-start">
          <h1 className="font-semibold text-2xl font-poppins text-[#017668]">
            Sources
          </h1>
          <div className="flex-col gap--y-2 w-full">
            <div className="w-full">
              <div className="w-full pb-1">
                <p
                  className="text-lg cursor-pointer  font-poppins bg-[#017668] text-white px-2"
                  onClick={() => handleToggle(0)}
                >
                  All Sources
                </p>
              </div>
              {/* List of all sources */}
              {toggle[0].status && (
                <ul className="text-start divide-y  flex-col flex  scrollbar md:max-h-[80vh] max-h-[15vh] overflow-y-scroll">
                  {sources.map((source, index) => (
                    <li
                      key={`source-${index}`}
                      className=" px-2  hover:bg-[#ECF9F7] text-[#017668] cursor-pointer"
                      onClick={() => this.handleSingleSource(source.id, index)}
                    >
                      {source.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* {favorites} */}
            <div className="w-full">
              <div className="w-full">
                <p
                  className="text-lg cursor-pointer  font-poppins  bg-[#017668] text-white px-2"
                  onClick={() => {
                    handleToggle(1);
                    setSourceSuccess({ id: -1 });
                  }}
                >
                  Favorites{" "}
                  {Boolean(favorites.length) && (
                    <span className="px-2 mx-2 text-[#017668] text-sm font-['nunito'] bg-white rounded-full">
                      {favorites.length}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//accessing redux store
const mapStateToProps = (NewsReducer) => {
  return {
    sources: NewsReducer.sources,
    favorites: NewsReducer.favorites,
  };
};

// dispatching actions
const mapDispatchToProps = (dispatch) => {
  return {
    setSourceRequested: (data) => dispatch(setSourceRequested(data)),
    setSourceSuccess: (data) => dispatch(setSourceSuccess(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sources));

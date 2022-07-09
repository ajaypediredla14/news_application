import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../common/withRouter";
import News from "../components/News";
import Sources from "../components/Sources";
import { setSourceRequested, setSourcesRequested } from "../store/NewsActions";

class MainNews extends Component {
  constructor() {
    super();
    //initializing toggle status for Allsources and favorites
    this.state = {
      toggle: [
        { id: 0, status: true },
        { id: 1, status: false },
      ],
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  componentDidMount() {
    this.props.setSourcesRequested();
  }

  //changing active tab of news sources
  handleToggle = (index) => {
    const { toggle } = this.state;
    const { sources } = this.props;
    if (index === 0) {
      this.props.setSourceRequested({ id: sources[0].id, index: 0 });
    }
    this.setState((prev) => {
      return {
        ...prev,
        toggle: toggle.map((toggle) => {
          if (toggle.id === index) {
            return {
              ...toggle,
              status: !toggle.status,
            };
          }
          return {
            ...toggle,
            status: false,
          };
        }),
      };
    });
  };
  render() {
    //destructuring state
    const { toggle } = this.state;
    return (
      <div className="flex flex-col md:flex-row font-['nunito'] p-4 overflow-hidden gap-4 h-screen ">
        <div className="shadow-md py-4 px-2 md:w-[300px]">
          {/* {calling child component by passing data and a call back function via props} */}
          <Sources toggle={toggle} handleToggle={this.handleToggle} />
        </div>
        <div className="h-[calc(100vh-2rem) shadow-md py-4 px-2 w-full lg:overflow-hidden overflow-scroll scrollbar ">
          <News toggle={toggle} />
        </div>
      </div>
    );
  }
}

//accessing redux store
const mapStateToProps = (NewsReducer) => {
  return { sources: NewsReducer.sources };
};

// dispatching actions
const mapDispatchToProps = (dispatch) => {
  return {
    setSourcesRequested: (data) => dispatch(setSourcesRequested(data)),
    setSourceRequested: (data) => dispatch(setSourceRequested(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainNews));

//checking local storage for favorites and setting it into redux store
const localFavs = JSON.parse(localStorage.getItem("Favorites"));

//initializing redux state
const initialState = {
  current_source: 0,
  sources: [],
  news: [],
  isLoading: false,
  favorites: Boolean(localFavs) ? [...localFavs] : [],
};

//changing redux store based on the actionTypes dispatched from actions
const NewsReducer = function (state = initialState, action) {
  let new_state;
  switch (action.type) {
    case "SET_SOURCES_SUCCESS":
      new_state = {
        ...state,
        sources: action.payload,
      };
      break;

    case "SET_SOURCE_REQUESTED":
      new_state = {
        ...state,
        isLoading: true,
      };
      break;

    case "SET_SOURCE_FAILURE":
      new_state = {
        ...state,
        isLoading: false,
      };
      break;

    case "SET_FAVORITES":
      localStorage.setItem(
        "Favorites",
        JSON.stringify(action.payload.tempFavs)
      );
      if (action.payload.isFavs) {
        new_state = {
          ...state,
          favorites: [...action.payload.tempFavs],
          news: [...action.payload.tempFavs],
        };
      } else {
        new_state = {
          ...state,
          favorites: [...action.payload.tempFavs],
        };
      }
      break;

    case "SET_SOURCE_SUCCESS":
      console.log("reducer", action.payload);
      if (action.payload.id === -1) {
        new_state = {
          ...state,
          isLoading: false,
          news: [...state.favorites],
        };
      } else {
        new_state = {
          ...state,
          isLoading: false,
          news: [...action.payload.articles],
        };
      }
      break;

    default:
      new_state = state;
  }
  return new_state;
};

export default NewsReducer;

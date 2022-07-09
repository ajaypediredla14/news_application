import {
  SET_SOURCES_REQUESTED,
  SET_SOURCES_FAILURE,
  SET_SOURCES_SUCCESS,
  SET_SOURCE_REQUESTED,
  SET_SOURCE_FAILURE,
  SET_SOURCE_SUCCESS,
  SET_FAVORITES,
} from "./newsActiontypes";

export const setSourcesRequested = () => {
  return {
    type: SET_SOURCES_REQUESTED,
  };
};

export const setSourcesSuccess = (data) => {
  return {
    type: SET_SOURCES_SUCCESS,
    payload: data,
  };
};

export const setFavorites = (data) => {
  return {
    type: SET_FAVORITES,
    payload: data,
  };
};

export const setSourcesFailure = () => {
  return {
    type: SET_SOURCES_FAILURE,
  };
};

export const setSourceRequested = (data) => {
  return {
    type: SET_SOURCE_REQUESTED,
    payload: data,
  };
};

export const setSourceSuccess = (data) => {
  return {
    type: SET_SOURCE_SUCCESS,
    payload: data,
  };
};

export const setSourceFailure = () => {
  return {
    type: SET_SOURCE_FAILURE,
  };
};

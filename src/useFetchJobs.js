import { useReducer, useEffect } from "react";
import axios from "axios";

//actions type
const ACTIONS = {
  MAKE_REQUEST: "make-request",
  GET_DATA: "get-data",
  ERROR: "error",
  UPDATE_HAS_NEXT_PAGE: "update-has-next-page",
};

const BASE_URL =
  "https://lit-waters-27528.herokuapp.com/https://jobs.github.com/positions.json"; //api endpoint   added cors to bypass cors restrictions

//state reducer
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] }; //returns empty list for jobs
    case ACTIONS.GET_DATA:
      return { ...state, loading: false, jobs: action.payload.jobs }; //fills jobs array with the json data from api endpoint
    case ACTIONS.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        jobs: [],
      }; //returns and error
    case ACTIONS.UPDATE_HAS_NEXT_PAGE:
      return { ...state, hasNextPage: action.payload.hasNextPage }; //returns if there is a next page
    default:
      return state;
  }
}

export default function useFetchJobs(params, page) {
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

  useEffect(() => {
    const cancelToken1 = axios.CancelToken.source(); //intial request cancel token
    dispatch({ type: ACTIONS.MAKE_REQUEST }); //intial request
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken1.token,
        params: { markdown: true, page: page, ...params },
      })
      .then((res) => {
        dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } }); //returns the data to reducer action get data
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } }); //cancel request if theres an error
      });

    const cancelToken2 = axios.CancelToken.source(); //has next page cancel token
    axios
      .get(BASE_URL, {
        cancelToken: cancelToken2.token,
        params: { markdown: true, page: page + 1, ...params },
      })
      .then((res) => {
        dispatch({
          type: ACTIONS.UPDATE_HAS_NEXT_PAGE,
          payload: { hasNextPage: res.data.length !== 0 },
        }); // if the data exsist on next page retunr to reducer action get data
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        dispatch({ type: ACTIONS.ERROR, payload: { error: e } }); //cancel request if theres an error
      });

    return () => {
      cancelToken1.cancel();
      cancelToken2.cancel(); //cancel request once request is complete
    };
  }, [params, page]);

  return state;
}

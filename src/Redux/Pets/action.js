export const PETS_LOADING = "PETS_LOADING";
export const PETS_SUCCESS = "PETS_SUCCESS";
export const PETS_ERROR = "PETS_ERROR";

export const petsLoadingFun = () => ({
  type: PETS_LOADING,
});

export const petsSuccessFun = (payload) => ({
  type: PETS_SUCCESS,
  payload,
});

export const petsErrorFun = () => ({
  type: PETS_SUCCESS,
});

export const getPetsData = (page, size) => (dispatch) => {
  dispatch(petsLoadingFun());
  fetch(`https://pet-boarding-server.herokuapp.com?page=${page}&size=${size}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch(petsSuccessFun({ pets: res.pets, totalPages: res.totalPages }));
      console.log(res);
    })
    .catch((error) => dispatch(petsErrorFun()));
};

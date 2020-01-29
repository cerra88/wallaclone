import * as TYPES from './types'
import api from '../utils/api'

const {getAds, findAdByID, getAdsbySearch, editAdvert} = api();

///////////////////////       SET USER      //////////////////////////////
export const setReduxUser = user => ({
    type: TYPES.SET_USER,
    user,
    
});

///////////////////////       EDIT ADS       //////////////////////////////

export const editAds = (id, advert) => {
    return async function (dispatch, getState) {
      dispatch(editAdRequest(advert));
      try {
        const { data } = await editAdvert(id, advert);
        console.log(data)
        dispatch(editAdSuccess(data.result));
      } catch (error) {
        dispatch(editAdFailure(error));
      }
    }
  }

export const editAdRequest = () => ({
    type: TYPES.EDIT_AD_REQUEST,
    
});

export const editAdSuccess = ad => ({
    type: TYPES.EDIT_AD_SUCCESS,
    ad,
  });

export const editAdFailure = error => ({
    type: TYPES.EDIT_AD_FAILURE,
    error,
});






///////////////////////       FETCH SEARCH ADS       //////////////////////////////

export const fetchSearchAds = (name, price, tagSelected, venta) => {
    return async function (dispatch, getState){
        dispatch(fetchSearchAdsRequest());
        try {
            const ads = await getAdsbySearch(name, price, tagSelected, venta)
            dispatch(fetchSearchAdsSuccess(ads));
        } catch (err) {
            dispatch(fetchSearchAdsFailure(err))
        }
    }

}

export const fetchSearchAdsRequest = () => ({
    type: TYPES.FETCH_SEARCH_ADS_REQUEST,
    
});

export const fetchSearchAdsSuccess = ads => ({
    type: TYPES.FETCH_SEARCH_ADS_SUCCESS,
    ads,
  });

export const fetchSearchAdsFailure = error => ({
    type: TYPES.FETCH_SEARCH_ADS_FAILURE,
    error,
});


///////////////////////       FETCH SINGLE AD         //////////////////////////////
export const fetchSingleAd = (id) => {
    return async function (dispatch, getState){
        dispatch(fetchSingleAdRequest());
        try {
            const ad = await findAdByID(id)
            dispatch(fetchSingleAdSuccess(ad));
        } catch (err) {
            dispatch(fetchSingleAdFailure(err))
        }
    }

}

export const fetchSingleAdRequest = () => ({
    type: TYPES.FETCH_SINGLE_AD_REQUEST,
    
});

export const fetchSingleAdSuccess = ad => ({
    type: TYPES.FETCH_SINGLE_AD_SUCCESS,
    ad,
  });

export const fetchSingleAdFailure = error => ({
    type: TYPES.FETCH_SINGLE_AD_FAILURE,
    error,
});



///////////////////////       FETCH  ADS         //////////////////////////////

export const fetchAds = () => {
    return async function (dispatch, getState){
        dispatch(fetchAdsRequest());
        try {
          const ads = await getAds()
          dispatch(fetchAdsSuccess(ads));
        } catch (err) {
          dispatch(fetchAdsFailure(err))
        }
    };
};

export const fetchAdsRequest = () => ({
    type: TYPES.FETCH_ADS_REQUEST,
    
});

export const fetchAdsSuccess = ads => ({
    type: TYPES.FETCH_ADS_SUCCESS,
    ads,
  });

export const fetchAdsFailure = error => ({
    type: TYPES.FETCH_ADS_FAILURE,
    error,
});
  
 

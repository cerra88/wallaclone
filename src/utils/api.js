import axios from 'axios';
const API_URL = `/api/product`
const API_URL_FILTERS = `http://localhost:3001/api/product?`


export const api = () => {
    
  return {

    // getTagsAds: async (query) => {
        
    //     const endPoint = `http://localhost:3001/apiv1/anuncios?tag=${query}`
    //     const response = await axios.get(endPoint);
    //     return response.data.results;

    // },
    
    getAds: async (query) => {
        try {
          const response = await axios.get(`${API_URL}?sort=-createdAt`);
          return response.data.result;  
        } catch (error) {
          throw(error)
        }
        

    },

    getAdsbySearch: async (name, price, tagSelected, type) => {
        
        let endPoint = `${API_URL_FILTERS}`
        console.log(endPoint)
        if(tagSelected){
          endPoint = `${API_URL}?&tags=${tagSelected}`
          
        }if(price){
          endPoint = `${endPoint}&price=0-${price}`
          
           
        }if(name){
          endPoint = `${endPoint}&name=${name}`
          
        }if(type){
          endPoint = `${endPoint}&type=${type}`
          
        }
        console.log(endPoint)
        const response = await axios.get(endPoint);
      return response.data.result;

    },

    findAds: async (query) => {
        
        const endPoint = `${API_URL}?name=${query}`;
        const response = await axios.get(endPoint);
        return response.data.result;
    },

    findAdByID: async (id, name) => {
        const endPoint = `${API_URL}/item/${id}/`;
        console.log(endPoint)
        const response = await axios.get(endPoint);
        return response.data.result;
        
      },
      
      getTags: async () => {
        const endPoint = `${API_URL}/tags`
        try {
          const response = await axios.get(endPoint);  
          return response.data.result;
        } catch (error) {
          throw(error)
        }
        
        
        
        

    },

    editAdvert: async (id, advert) => {
      const endPoint = `http://localhost:3001/apiv1/anuncios/${id}`;
      console.log('enpoint de edit es: ', endPoint)
			const res = await axios({
        method: 'put',
        url: endPoint,
        data: advert
      });
      return res;
        
    },
    
    newAdvert: async (advert) => {
      console.log(advert)
      const endPoint = API_URL;

      console.log(advert.user)

      const formData = new FormData();
      formData.append('name', advert.name);
      formData.append('description', advert.description);
      formData.append('type', advert.type);
      formData.append('price', advert.price);
      formData.append('tags', advert.tags);
      formData.append('user', advert.user);
      formData.append('photo', advert.photo[0]);
      
      console.log(formData)
			const res = await axios({
        method: 'post',
        url: endPoint,
        data: formData
      });
      console.log(res.data)
      return res.data;
    },


    newUser: async (user) => {
  
      const endPoint = `/api/register`;
      // if(advert.venta === "true"){
      //   advert.venta = true;
      // }else{
      //   advert.venta = false;
      // }
      
			const res = await axios({
        method: 'post',
        url: endPoint,
        data: user
      });
      return res.data;
    },



    findUser: async (user) => {
      
      const endPoint = `/api/authenticate`;
      
			const res = await axios({
        method: 'post',
        url: endPoint,
        data: user
      });
      
      return res.data;
    },

    checkCookie: async () => {
      const endPoint = `/api/checkuser`;
      return axios.get(endPoint)
      
        .then(response => response.data.result)
        
				.catch(err => {
					throw err;
				})
    },

    logOut: async () => {
      const endPoint = `/api/logout`;
      console.log(endPoint)
      return axios.get(endPoint)
        .then(response => response.data.result)
        
				.catch(err => {
					throw err;
				})

    }



  }

}

export default api;

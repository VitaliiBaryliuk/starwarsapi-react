const BASE_URL = 'https://swapi.co/api/'

const SwApi = {

  getRootApiData: async () => {
    const responce = await (await fetch(BASE_URL)).json()

    return responce; 
  },   

  getApiDataList: async (category) => {
    const responce = await (await fetch(BASE_URL + category)).json()
    
    return responce;
  },

  getApiDataItem: async (category, id) => {
console.log(BASE_URL + category + '/' + id)

    const responce = await (await fetch(BASE_URL + category + '/' + id)).json()
    
    return responce;
  },
}

export default SwApi
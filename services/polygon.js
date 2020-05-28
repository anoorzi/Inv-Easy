import apisauce from 'apisauce'

import config from '../config'

const polygonApi = (baseURL = config.POLYGON_URL) => {
    
    const api = apisauce.create({
        baseURL: config.POLYGON_URL,
 
        timeout: 5000
    })

    const params = {
        apiKey : config.ALPACA_API_KEY_ID
    }
    const newsParams = {
        apiKey : config.ALPACA_API_KEY_ID,
        perpage: 15,
        page:1,


    }


    const getQuote = (symbol) =>  api.get(`v2/snapshot/locale/us/markets/stocks/tickers/${symbol}`, params)
    const getNews = (symbol) =>  api.get(`v1/meta/symbols/${symbol}/news`, newsParams)



    return {
        getQuote,
        getNews        

    }

}

export default polygonApi
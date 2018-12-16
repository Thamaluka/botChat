const axios = require('axios')
const cheerio = require('cheerio')

var entryDate, endDate;

exports = {
    entryDate,
    endDate
}


const LeanResponse = (html, config) => {
    let $ = cheerio.load(html)
    return $(config.title).map(config.returnResponse($)).get()
}

const SearchNoticies = async (LeanResponse, config) => {
    try {
        const response = await axios({ url: config.url, method: 'get' })
        const objectReturn = await LeanResponse(response.data, config)
        return Promise.resolve(objectReturn)
    } catch (err) {
        return Promise.reject(err)
    }
}

const config = {
    title: '.maintable ',
    body: {
        table: 'td',
        class: 'roomExcerpt'
    },
    url: `https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation#/&diff=false&CheckIn=${this.entryDate}&CheckOut=${this.endDate}&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-`,
    returnResponse: ($) => (index, element) => ({


    })
}

SearchNoticies(LeanResponse, config)
    .then(resp => console.log('response', resp))
    .catch(err => console.log('error', err))


var rp = require('request-promise')
var cheerio = require('cheerio')

var options = {
  uri: 'https://myreservations.omnibees.com/default.aspx?q=5462&version=MyReservation#/&diff=false&CheckIn=18122018&CheckOut=19122018&Code=&group_code=&loyality_card=&NRooms=1&ad=1&ch=0&ag=-',
  transform: function (html) {
    return cheerio.load(html)
  }
}

function processData(data) {
  console.log(JSON.stringify(data));
}

rp(options)
  .then(($) => {

    var rooms = [];

    $('roomExcerpt').each((i, item) => {
      console.log('Aqui: ', $(item))


      var room = {
        nome: $(item).find('.excerpt').find('h5').children('a').text(),
        descricao: $(item).find('.excerpt').find('p').children('a').text(),
        preco: $(item).find('.bestPriceTextColor').text(),
        img: $(item).find('.slide').children('a').find('img').attr("src")
      }

      if (room.nome !== "")
        rooms.push(room)
    })


    processData(rooms)

  })
  .catch((err) => {
    console.log(err);
  })
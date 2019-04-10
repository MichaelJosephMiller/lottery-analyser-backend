const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

export const scrapeMegaMillions = async () => {
  let dataObj = {};

  dataObj = await nightmare
    .goto('https://www.megamillions.com')
    .wait(2000)
    .evaluate((obj) => {
      obj.estJackpot = document.querySelector('span.nextEstVal.js_estJackpot').innerText;
      obj.cashOpt = document.querySelector('span.cashOpt').innerText;
      obj.nextDrawDate = document.querySelector('span.nextDrawDate').innerText + ' @ 11 pm ET';
      return obj;
    }, dataObj)
    .then(o => {
      return nightmare.click('a.bigWinViewAll')
        .wait(2000)
        .evaluate( obj => {
          obj.jackpotWinningNumbersTbl = document.querySelector('div.tableJackpotWinningNumbers')
          console.log(obj);
          return obj;
        }, o)
        .end()
    })
    .then( o => { return o} )
    .catch(error => {
      console.error('Search failed:', error)
  });

  console.log(dataObj);
}

var rest = require('restler');
const apiUrl = 'https://api.exchangeratesapi.io/';

var self = (module.exports = {
  ver001: (data, res) => {
    // validate that a base currency is supplied
    if (typeof data.base === 'undefined' || data.base === '') {
      self.sendResponse(res, 403, 'Please supply a base currency symbol');
      return;
    }

    // convert base to uppercase for consistancy
    var base = data.base.toUpperCase();

    // validate that a symbol to convert to. Eg CAD/AUD/USD
    if (typeof data.symbol === 'undefined' || data.symbol === '') {
      self.sendResponse(
        res,
        403,
        'Please supply a currency symbol to convert to'
      );
      return;
    }

    // validate that an amount is provided
    if (typeof data.amount === 'undefined' || data.amount === '') {
      self.sendResponse(res, 403, 'Please supply an amount to convert');
      return;
    }

    // build the API call URL
    var url =
      apiUrl + 'latest?symbols=' + data.symbol.from + ',' + data.symbol.to;

    if (typeof data.symbol === 'object') {
      var str = '';
      var symbolArray = data.symbol;

      for (var i = symbolArray.length - 1; i >= 0; i--) {
        str += symbolArray[i].toUpperCase() + ',';
      }

      var symbols = str;
    } else {
      var symbols = data.symbol.toUpperCase();
    }

    if (typeof data.date !== 'undefined') {
      if (typeof data.date !== 'string') {
        self.sendResponse(res, 403, 'Please provide the date as a string');
        return;
      }
      var date = data.date;
    } else {
      var date = 'latest';
    }

    var url = apiUrl + date + '?base=' + base + '&symbols=' + symbols;

    console.log('Calling Fixer API at: ', url);

    rest.get(url).on('complete', function(result, response) {
      console.log('result :', result);
      if (response.statusCode == 200) {
        var returns = {
          base: data.base,
          amount: data.amount,
          results: self.convertAmount(data.amount, result),
          dated: data.date,
        };

        self.sendResponse(res, 200, returns);
      }
      if (response.statusCode == 401) {
        callback('Not Authorized');
      }
      if (response.statusCode == 502) {
        callback('API Error');
      }
    });
  },

  convertAmount: (amount, data) => {
    var rates = data.rates;
    var returns = [];

    for (var r in rates) {
      if (rates.hasOwnProperty(r)) {
        var convert = amount * rates[r];
        returns.push({
          from: data.base,
          to: r,
          roundedResult: convert.toFixed(2),
          fullResult: convert,
          rate: rates[r],
        });
      }
    }

    return returns;
  },

  sendResponse: (res, status, response) => {
    res.status(status);
    res.json(response);
    res.end();
  },
});

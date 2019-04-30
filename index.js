var express = require('express'); 
var app = express();
var xlsx = require('node-xlsx');
var request = require('request');

var sheets = xlsx.parse(__dirname + '/files/2019-04-30.xls');
var code = []
sheets.forEach(function (sheet) {
  for (var rowId in sheet['data']) {
    var row = sheet['data'][rowId];
    code.push(row[0].split('.')[0])
  }
});
code.shift(0)


var cookies = "em_hq_fls=js; em-quote-version=topspeed; qgqp_b_id=66dea2fa21ed913b2187297beefd049b; st_si=35973376464861; p_origin=https%3A%2F%2Fpassport2.eastmoney.com; ct=NRQvGkcmeOD4pNM4H2pbXKseSaFRWVQGS818ySLXxnFqAgoQxfJmvnXjzfnOZVRPh7ImVbAwCC3GY-dKYpQ32WlLMvHhAJJHLNXHI3bl-SiRRt7ISr6vzWBAIxnNZv4Ai4wx9hQsoiiCPe3IYl2nARLa_Fu6wARmNASDWlsLQxA; ut=FobyicMgeV52Ad4fCxim_MOKSRJKi9oAqtzbuIBkUunvqmOJLQw1DlDuGLXXNiGFPIazfAdvYKGYsXX_wi8Jj6LK4cWvvd5wn7BJ8kaanSIQ0RG1CRrUt7Wh8XFP7UndXbWSF-EUvVmJFh0Nivh_19KgiB9DA21lKxZ1DN3QfpYku2fi4lTO9ghksEp7aDYiHnrFb1hZwFqdP4l_aQ5LnoNX-bzJQG-vSA8WSrWjeSca0XOH6REtMND151-BW4mycAgclTz9ULCtec5tLEKRxNdhAwdtNm5T; pi=6734325566100472%3bz6734325566100472%3b%e8%82%a1%e5%8f%8bQajjB9%3b38fE6IvJhCIDnL6ZALvcnxMEgoj6R4KRCHTnPQU4nvEsQmQ10bvwRtILF85kDv2F3ZTnGhNDL%2bubaQ7bOVvFAf5RqwblsLjj4unQKy2nc%2f6r9fYDoYarq22alzK0aDUmuv5nzx47BcFN3hRruYJXsw4kw3DbKbtUncTaoVmMHctqbDmOQ9NjqV4wMEOdHF2s%2bGXk3sS%2b%3blN3al6aMvLG5iF5hXGK1ooFgFDn%2fMF21uU9cJFqeo31rlYfKlFSNkk6ZlZCK44%2fmCWgMIC0j6Gu1FORwG4cBOChNlwIjw23iNidhmGb4JYuD761mQBNDDmUI8xLlUBuvv9Txl%2bjQj8%2bzBcnafttS3bQfGoOxqA%3d%3d; uidal=6734325566100472%e8%82%a1%e5%8f%8bQajjB9; sid=135084152; vtpst=|; HAList=a-sz-300266-%u5174%u6E90%u73AF%u5883%2Ca-sz-000004-%u56FD%u519C%u79D1%u6280%2Ca-sh-603799-%u534E%u53CB%u94B4%u4E1A%2Ca-sh-600735-%u65B0%u534E%u9526; st_asi=delete; st_pvi=77027711071051; st_sp=2019-03-26%2014%3A05%3A20; st_inirUrl=https%3A%2F%2Fwww.google.com%2F; st_sn=9; st_psi=20190430172930808-113200301712-7181453961"

for (let i = 0; i < code.length; i++) {
  let temp = ""
  if (code[i][0] === '0' || code[i][0] === '3') {
    temp = `0.${code[i]}`
  } else {
    temp = `1.${code[i]}`
  }
  setTimeout(function() {
    let option = {
      method: 'POST',
      url: 'http://quote.eastmoney.com/zixuan/api/zxg/addstock',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': cookies
      },
      body: `groupid=266382309&stockcode=${temp}`
    }
    request(option, function (err, httpResponse, body) {
      console.log(err, httpResponse, body)
    })
  }, 4000)
}

var server = app.listen(8006, function () {
  var port = server.address().port
  console.log('Open http//127.0.0.1:%s', port)
})

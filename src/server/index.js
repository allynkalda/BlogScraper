const express = require('express');
const fetch = require('node-fetch');
const jsdom = require('jsdom');
const bodyParser = require('body-parser');

const { JSDOM } = jsdom;

const app = express();

app.use(express.static('dist'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

let title;
let body;
const getData = async (url, send) => {
  const response = await fetch(url);
  const text = await response.text();
  const dom = await new JSDOM(text);
  title = dom.window.document.querySelector('h3').textContent;
  // const body = dom.window.document.getElementsByClassName('post-body entry-content');
  body = dom.window.document.querySelectorAll('[dir="ltr"]')[1].innerHTML;
  send();
};

app.post('/api/getText', (req, res) => {
  const { url } = req.body;
  // const url = 'https://saudadeandotherstories.blogspot.com/2018/12/post-break-up-day-18.html';
  const send = () => res.send({ title, body });
  getData(url, send);
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

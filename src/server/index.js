const express = require('express');
const fetch = require('node-fetch');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const app = express();

app.use(express.static('dist'));

let title;
let body;
const getData = async (url, send) => {
  const response = await fetch(url);
  const text = await response.text();
  const dom = await new JSDOM(text);
  title = dom.window.document.querySelector('h3').textContent;
  // const body = dom.window.document.getElementsByClassName('post-body entry-content');
  body = dom.window.document.querySelectorAll('[dir="ltr"]')[1].innerHTML;
  console.log(body);
  send();
};

app.get('/api/getText', (req, res) => {
  const url = 'https://saudadeandotherstories.blogspot.com/2017/12/maneki-neko.html';
  const send = () => res.send({ title, body });
  getData(url, send);
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

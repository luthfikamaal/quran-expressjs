const express = require('express');
const surah = require('./data/surah.json');
const quran = require('./data/quran.json');
const BodyParser = require('body-parser');

const app = express();

const HTTP_PORT = 8000;

app.use(express.static(__dirname + '/public'));
app.use(BodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'public/views');

app.get('/', (req, res) => {
  const allSurah = surah.data;
  // res.send(data[0].name);
  res.render('index', {
    surahs: allSurah,
  });
});

app.get('/surah/:id', (req, res) => {
  const number = req.params.id - 1;
  const surahs = surah.data;
  const surahData = surah.data[number];
  const verses = quran.data[number].verses;
  res.render('surah', {
    data: verses,
    surahNumber: req.params.id,
    surahs: surahs,
    surah: surahData,
  });
});

app.get('/search/:surah', (req, res) => {
  let keyword = req.params.surah.toLocaleLowerCase();
  let surahs = surah.data;
  var list = '';
  for (let surah of surahs) {
    let name = surah.name.transliteration.id.toLocaleLowerCase();
    let result = name.includes(keyword);
    if (result) {
      list += `<li class="list-group-item pt-2"><a href="/surah/` + surah.number + `" class="text-decoration-none text-black m-0 w-100">` + surah.name.transliteration.id + `</a></li>`;
    }
  }
  res.send(list);
});

app.listen(HTTP_PORT, function () {
  console.log('Ready...');
});

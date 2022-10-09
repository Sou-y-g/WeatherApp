/*構想
backgroundで徳島の地図を配置
各エリアに今日の天気を配置して、それを押すと5日間の天気と降水量を取得して表示
*/

// 今日の日付の取得と表示
const date = new Date();
document.getElementById('today').innerHTML = dayjs(date).format('YYYY年MM月DD日');

// APIキー
const API_KEY = '';

//位置情報リスト
const places = {
  tokushima: [34.0774397, 134.5518621],
  katsura: [33.916884, 134.472888],
  narutaki: [33.909891, 134.369191],
  kamikatsu: [34.0774397, 134.5518621],
};

// 天気の日本語
const tranceLang = {
  Clear: '晴れ',
  Rain: '雨',
  Clouds: '曇り',
  Snow: '雪',
};

//URLを取得する処理
function getURL() {
  //現在選択している場所を取得
  const selectPlace = document.getElementById('place').value;
  console.log(selectPlace);
  const lat = places[selectPlace][0];
  const lon = places[selectPlace][1];

  // 天気情報の取得
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  const URL5 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  return [URL, URL5];
}

//URLからjsonを取得してdataに格納
const getWeather = async () => {
  const res = await fetch(getURL());
  const data = await res.json();
  return data;
};

//ページが読み込まれた時の処理
addEventListener('load', async () => {
  const data = await getWeather();
  // JSONから天気を取得してHTMLの今日の天気に記載(ついでに日本語変換)
  document.getElementById('weather').innerHTML = tranceLang[data.weather[0].main];
  // 天気の画像表示、HTMLのimg要素取得
  const image = document.getElementById('weatherimg');
  // 要素のsrcに画像パス追加
  const weatherInfo = data.weather[0].main;
  image.src = `./img/${weatherInfo}.jpg`;
});

//プルダウンで他の地域を選択した時の処理(上と一緒)
//上と同じ処理なので簡略化できないかな？
const place = document.getElementById('place');
place.addEventListener('change', async () => {
  const data = await getWeather();
  document.getElementById('weather').innerHTML = tranceLang[data.weather[0].main];
  const image = document.getElementById('weatherimg');
  const weatherInfo = data.weather[0].main;
  image.src = `./img/${weatherInfo}.jpg`;
});

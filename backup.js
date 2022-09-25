 // 今日の日付の取得と表示
 const date = new Date();
 document.getElementById('today').innerHTML = dayjs(date).format('YYYY年MM月DD日')
 
 // APIキー
 const API_KEY = '9161fbe8d29fd2414f5f0f003140542a';
 
 //位置情報リスト
 const places = {
     'tokushima': [34.0774397,134.5518621],
     'tokyo': [33.916884,134.472888],
     'osaka': [33.909891,134.369191],
     'hukuoka': [34.0774397,134.5518621],
 }
 
 // 天気の日本語
 const tranceLang = {
     Clear : '晴れ',
     Rain : '雨',
     Clouds : '曇り',
     Snow : '雪'
 }
 
 function forecast(){
 
     //現在選択している場所を取得
     const selectPlace = document.getElementById('place').value;
     console.log(selectPlace)
     const lat = places[selectPlace][0]
     const lon = places[selectPlace][1]
     
     // 天気情報の取得
     const URL =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
     
     //URLをfetchしてjsonファイルを取ってくる処理
     //ここはあくまでも下のaddEventListenerが実行されてから呼び出される
     const getWeather = async () => {
         const res = await fetch(URL);
         // これ以降の処理はfetchが実行されてから(以下、上記のURLに接続してJSONファイルを取ってくる)
         const data = await res.json();
         console.log(data)
         return data;
     };
 
     //ページが読み込まれた時の処理
     //ここにプルダウンの変更がされた時の処理もかけたらいい
     addEventListener('load', async () => {
         const data = await getWeather();
 
         // JSONから天気を取得してHTMLの今日の天気に記載(ついでに日本語変換)
         document.getElementById('weather').innerHTML = tranceLang[data.weather[0].main]
         
         // 天気の画像表示、HTMLのimg要素取得
         const image = document.getElementById('weatherimg');
         // 要素のsrcに画像パス追加
         const weatherInfo = data.weather[0].main;
         image.src = `./img/${weatherInfo}.jpg`
     });
 }
 
 forecast();
 
 //プルダウンで他の地域を選択した時の処理
 const place = document.getElementById('place')
 place.addEventListener('change', forecast(), false);
 
 /*
     addEventListenerでプルダウンが変更された時の処理を書く必要がある
     しかし、処理の中でforecast関数を呼び出すと、
     forecast内のaddEventListenerがload時になっているので実行されない
     【候補】
     addEventListenerの第一引数をloadとchangeで分岐させる
     ブロック外からgetWeather関数を呼び出す
     getWeather関数をグローバル関数にする？
 */
 
     // const day5URL = `https://api.openweathermap.org/data/2.5/forecast?lat=33.590&lon=130.419&appid=${API_KEY}`;
     
     // const get5dayWeather = async () => {
 //     const res = await fetch(day5URL);
 //     const data = await res.json();
 
 //     const weatherInfo = data.weather[0].main
 // }
 
 
'use strict';
const userNameInput = document.getElementById('user-name');
const assesmentButton = document.getElementById('assesment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element){
   while (resultDivided.firstChild){ //result-areaに何かタグがある限りループ
      resultDivided.removeChild(resultDivided.firstChild);
 }
}

/**
 * 診断処理を実行して指定した要素に追加する結果を表示する
 * @param {HTMLElement} element HTMLの要素
 */
function createAssessmentResult(element,result){
const header = document.createElement('h3'); //h3タグを作る
header.innerText = '診断結果';　//h3タグに'診断結果'の文字列を設定
resultDivided.appendChild(header);//result-areamに　h3　変数を設定

//result-areaにpタグで診断結果を表示
const p = document.createElement('p');
p.innerText = result;
resultDivided.appendChild(p);
}

userNameInput.onkeydown = event =>{
   if (event.key === 'Enter'){
     assesmentButton.onclick();
   }
}


assesmentButton.onclick = () => {
   let userName = userNameInput.value;
   if(userName.length === 0){
      return;
   }

//診断結果の表示
removeAllChildren(resultDivided); //診断結果エリアの初期化

//診断を実行して表示
const result = assessment(userName);

//tweetボタンの表示
removeAllChildren(tweetDivided);//tweetエリアの初期化

//aタグを作って属性を設定
const a = document.createElement('a');
const href = 
'https://twitter.com/intent/tweet?button_hashtag=' +
encodeURIComponent('あなたのいいところ') +
'&ref_src=twsrc%5Etfw';

a.setAttribute('href',href);
a.className = 'twitter-hashtag-button';
a.setAttribute('date-text',result);
a.innerText = 'Tweet #あなたのいいところ';

//aタグをHTMLに追加
tweetDivided.appendChild(a);

//scriptタグを作る
const script  = document. createElement('script');
script.setAttribute('src','https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);

createAssessmentResult(resultDivided,result);

   //TODO ツイートエリアの作成
}

const answers = [
   '{userName}のいい所は筋肉が豊富な所です。{userName}の巧みな筋肉で、質量の重みをわからせましょう。',
   '{userName}のいい所は富士美額です。はげと煽る奴に本物のM字のタトゥーをこっそり掘りましょう。',
   '{userName}のいい所はタトゥーです。社会的に受け入れられない風潮すら、和彫の前では無力。',
   '{userName}のいい所はアウトローへの知識です。次世代の北野武。',
   '{userName}のいい所は大家族です。血族の多さとパーティーゲームの強さで世間をサヴァイブ。',
   '{userName}のいい所は逆関節です。仮病、脱獄、宴会芸など用途は様々。',
   '{userName}のいい所はオスグットです。文化部には味わえない痛みがここにある。',
   '{userName}のいい所は健康です。それ以外に誇るものはなくたって、100年後に笑っているのは君だけだ！',
   '{userName}のいい所は遊戯王の強さです。ここぞとばかりにレアカードを見せつけろ！',
   '{userName}のいい所は遠近感です。{userName}は程よく気持ちい距離なんだよね。',
   '{userName}のいい所は右翼思想です。{userName}、せおえ日の丸、流せ演歌！',
   '{userName}のいい所は両親が極左です。{userName}君は未来のチェゲバラ、仕掛けろゲリラ戦。',
   '{userName}のいい所は人んちの犬に馴れ馴れしい事です。こら〜ジョン、交尾しない',
   '{userName}のいい所は富です。富 is all',
   '{userName}のいい所はフォロワーの多さです。はい',
   '{userName}のいい所は可愛さです。萌〜'
];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string}userName ユーザーの名前
 * @return{string} 診断結果
 */
function assessment(userName){

   var answerNumber = 0;

   for (let i = 0; i < userName.length; i++){
      answerNumber = answerNumber + userName.charCodeAt(i);
   }

   //５桁の数値を回答結果の範囲(0~15)に変換
   var index = answerNumber % answers.length;
   //診断結果
   var result = answers[index];
   //正規表現
   return result.replace(/\{userName\}/g, userName);//置換
   //TODO　診断結果を実装する
}


'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て除去する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
  while (element.firstChild) {
    // 子どもの要素があるかぎり除去
    element.removeChild(element.firstChild);
  }
}

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }

  // 診断結果表示エリアの作成
  removeAllChildren(resultDivided);
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  // ツイートエリアの作成
  removeAllChildren(tweetDivided);
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('あなたのいいところ') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivided.appendChild(anchor);

  // widgets.js の設定
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
};

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
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfcharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfcharCode % answers.length;
  let result = answers[index];

  result = result.replace(/{userName}/g, userName);
  return result;
}

// テストコード
console.assert(
  assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);

var imgSrc = [
	{ "name": "クマモン", "src": "./images/kumamon.jpg", bgColor: "red"},
	{ "name": "熊本", "src": "./images/kumamoto.jpg", bgColor: "blue"},
	{ "name": "菊池市", "src": "./images/kikuchi.jpg", bgColor: "yellow"}
];

//num番目のキャラをdivオブジェクトとして返す関数
var newCard = function(num) {
	var divTag = document.createElement("div");
	var pTag = document.createElement("p");
	var imgTag = document.createElement("img");
	var buttonTag = document.createElement("button");

	//divタグの設定
	divTag.className = "wrapper";
	divTag.style.backgroundColor = imgSrc[num].bgColor;
	divTag.setAttribute("data-id", num);

	//imgタグの設定
	imgTag.src = imgSrc[num].src;
	imgTag.className = "char";

	//pタグの設定
	pTag.className = "name";
	pTag.innerHTML = imgSrc[num].name;

	//buttonタグの設定
	buttonTag.className = "button";
	buttonTag.innerHTML = "変更";
	buttonTag.addEventListener("click", function(e) {
		changeCard(this.parentNode);
	}, false);

	divTag.appendChild(imgTag);
	divTag.appendChild(pTag);
	divTag.appendChild(buttonTag);

	return divTag;
}

//ランダムな数を生成する関数：（prohibited以外で。nullの場合は何でも）
var randomNum = function(prohibited) {
	var target = 0;

	do {
		target = Math.floor(Math.random() * imgSrc.length);
	} while(target == prohibited);

	console.log("次の番号は :" + target);
	return target;
}

var appendCard = function(parent) {
	//新しいカードをappendする。
	parent.appendChild(newCard(randomNum(null)));
}

var changeCard = function(target) {
	var currentNum = parseInt(target.getAttribute("data-id"));
	console.log("現在の番号は :" + currentNum);

	target.parentNode.insertBefore(newCard(randomNum(currentNum)) ,target);
	target.parentNode.removeChild(target);
}

var d = function(value) { var a = document.getElementById(value); return a;};

document.addEventListener("DOMContentLoaded", function() {
	var output = document.getElementById("output");
	var addBtn = document.getElementById("add");

	addBtn.addEventListener("click", function() {
		appendCard(output);
	}, false);

}, false);

/*
岡崎さんのようにカスタムデータAttributeにデータを渡すのか？
キーだけをDOMに渡すのか？
タグの属性　or タグの順番（3番目とか）　or
イベントオブジェクトから得られる情報にはどのような情報がある？ 
*/


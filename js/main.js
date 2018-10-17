(function() {
    'use strict';
    appendExternalCSS();
    main();
})();


//классом rendered будем помечать блоки с отредеренными формулами
function appendCSS(){
    $('<style>\
       .rendered {}\
      </style>').appendTo($("html > head"));
}


//заменяем html символы на unicode
function htmlReplacer(str, offset, s){
    if (str == "&quot;") return '"';
    if (str == "&gt;") return '>';
    if (str == "&lt;") return '<';
	if (str == "<br>") return '';
	if (str == "amp;") return '';
}


//заменяем текст формулы на ее саму
function formulaReplacer(str, group_1, group_2, offset, s){
    var formula, formulaType = str[0] == '\\', res;
    if (formulaType) formula = group_2;
    else formula = group_1;
    var buffer = document.createElement('span');
    try{   //рендерим формулы и после возвращаем результат
            katex.render(formula.replace(/&quot;|&gt;|&lt;|<br>|amp;/g, htmlReplacer), buffer, {displayMode: formulaType});
            res = buffer.innerHTML;
        } catch(e) {
            buffer.setAttribute('style', 'background: #fc0;');
            buffer.innerHTML = formula;
            res = buffer.outerHTML;
        }
    return res;
}


//ищем формулы и отпрявляем в formulaReplacer на рендеринг
function prepareInnerHTML(messIndex, innerStr){
    $( this ).addClass("rendered");    //помечаем отрендеренное сообщение классом rendered
    return innerStr.replace(/\$\$(.*?)\$\$|\\\[(.*?)\\\]/g, formulaReplacer);
}


//ищем все блоки, где может быть написана формула
function render_all(){
    $(".im-mess:not(.rendered),\
       .reply_content:not(.rendered),\
       .wall_post_text:not(.rendered),\
       .article_layer__content:not(.rendered)").html(prepareInnerHTML);
}



function main(){
    appendCSS();
    setInterval(render_all, 200);
}

//подключаем внешние стили
function appendExternalCSS(){
		var new_link = document.createElement("link");
		new_link.setAttribute('rel', "stylesheet");
		new_link.setAttribute('href', "https://cdn.jsdelivr.net/npm/katex@0.10.0-beta/dist/katex.min.css");
		new_link.setAttribute('integrity', "sha384-9tPv11A+glH/on/wEu99NVwDPwkMQESOocs/ZGXPoIiLE8MU/qkqUcZ3zzL+6DuH");
		new_link.setAttribute('crossorigin', "anonymous");
		document.head.appendChild(new_link);
	}
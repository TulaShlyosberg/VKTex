(function() {
    'use strict';
    main();
})();

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
    //удалить потом класс формула
    var buffer = document.createElement('span');
    buffer.className = 'formula';
    try{   //рендерим формулы и после возвращаем результат
            katex.render(
                formula.replace(/&quot;|&gt;|&lt;|<br>|amp;/g, htmlReplacer),
                buffer, 
                {displayMode: formulaType}
            );            
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
       .wall_post_text:not(.rendered)").html(prepareInnerHTML);
}


function dummy() {
    buffer = $('.katex-display')[0]; 
    buffer.style.padding = '13px';
    buffer.style.height = '100px';
    html2canvas(buffer, {
        windowWidth: buffer.scrollWidth,
        windowHeight: buffer.scrollHeight,
        width: buffer.clientWidth,
        height: $(buffer).outerHeight()
    }).then(function(canvas) {
        let context = canvas.getContext('2d');
        context.scale(0.5, 0.5);
        console.log(canvas.toDataURL());
        canvas.toBlob(function(blob) {
            blob.filename = 'formula12456.png';
            blob.name = 'formula12456.png';
            window.Upload.onFileApiSend(2, [blob]);
        });
    });
}

function main(){
    setInterval(render_all, 200);
    setTimeout(dummy, 10000)
}


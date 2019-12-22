// импортируем библиотеки
libs = [
    'html2canvas.js',
    'jQuery.min.js',
    'katex.min.js',
    'main.js'
]

for (let lib in libs) {
    let script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", chrome.extension.getURL("js/" + libs[lib]));
    let head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;
    head.appendChild(script);
}

console.log('Scripts injected');

// импортируем стили
stylesheets = [
    "katex.min.css",
    "main.css"
]

for (url in stylesheets) {
    let new_link = document.createElement("link");
    new_link.setAttribute('rel', "stylesheet");
    new_link.setAttribute('href', chrome.extension.getURL("css/" + stylesheets[url]));
    new_link.setAttribute('crossorigin', "anonymous");
    document.head.appendChild(new_link);
}

console.log('Css injected');

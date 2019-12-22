libs = [
    'html2canvas.js',
    'jQuery.min.js',
    'katex.min.js',
    'main.js'
]

for (let lib in libs) {
    let script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", chrome.extension.getURL("js/" + lib));
    let head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;
    head.appendChild(script);
}
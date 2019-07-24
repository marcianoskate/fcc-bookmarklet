javascript:(function(){

    function main() {
        alert('hello world');
        html2canvas(document.querySelector("img")).then(canvas => {
            canvas.id = 'helloWorld';
            var container = document.querySelector(".bkWMgd");
            container.insertAdjacentElement("afterend", canvas);
        });
    }

    function dynamicallyLoadScript(url, callback) {
        var scriptNode = document.createElement("script");
        scriptNode.src = url;
        scriptNode.onload = main;
        document.body.appendChild(scriptNode);
        callback();
    }

    dynamicallyLoadScript('https://html2canvas.hertzen.com/dist/html2canvas.min.js');

})();
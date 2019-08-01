javascript:(function(){

    var imageDataArray = [];
    var canvasCount = 35;

    const css = `
        .dust { position : absolute; }
    `;

    function main() {
        alert('hello world');
        html2canvas(document.querySelector("img")).then(canvas => {
            canvas.id = 'helloWorld';

            const styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.appendChild(document.createTextNode(css));
            const head = document.head || document.getElementsByTagName('head')[0];
            head.appendChild(styleElement);

            var divContainer = document.createElement("div");
            divContainer.id = 'canvasContainer';
            divContainer.style.position = 'relative';
            divContainer.append(canvas);

            /*Insert canvas in document*/
            var container = document.querySelector(".bkWMgd");
            container.insertAdjacentElement("afterend", divContainer);

            /*Get image on canvas*/
            var ctx = canvas.getContext("2d");
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var pixelArr = imageData.data;
            createBlankImageData(imageData);
            /*Randomly distribute the pixels
            put pixel info to imageDataArray (Weighted Distributed)*/
            for (let i = 0; i < pixelArr.length; i+=4) {
                /*find the highest probability canvas the pixel should be in*/
                let p = Math.floor((i/pixelArr.length) * canvasCount);
                let a = imageDataArray[weightedRandomDistribution(p)];
                a[i] = pixelArr[i];
                a[i+1] = pixelArr[i+1];
                a[i+2] = pixelArr[i+2];
                a[i+3] = pixelArr[i+3];
            }
            /*create canvas for each imageData and append to target element*/
            for (let i = 0; i < canvasCount; i++) {
                let c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
                c.classList.add("dust");
                divContainer.append(c);
            }
        });
    }

    function dynamicallyLoadScript(url) {
        var html2Canvas = document.createElement("script");
        html2Canvas.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';

        var chancejs = document.createElement("script");
        chancejs.src = 'https://chancejs.com/chance.min.js';
        chancejs.onload = main;

        document.body.appendChild(html2Canvas);
        document.body.appendChild(chancejs);
    }

    /*WeightedRandomDistribution it's meant to pick pixels randomly but following a distribution function
    to make the effect of disappearing from the top, source: https://redstapler.co/thanos-snap-effect-javascript-tutorial/*/
    function weightedRandomDistribution(peak) {
        var prob = [], seq = [];
        for(let i=0;i<canvasCount;i++) {
            prob.push(Math.pow(canvasCount-Math.abs(peak-i),3));
            seq.push(i);
        }
        return chance.weighted(seq, prob);
    }

    function createBlankImageData(imageData) {
        for(let i=0;i<canvasCount;i++)
        {
            let arr = new Uint8ClampedArray(imageData.data);
            for (let j = 0; j < arr.length; j++) {
                arr[j] = 0;
            }
            imageDataArray.push(arr);
        }
    }

    function newCanvasFromImageData(imageDataArray ,w , h) {
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        tempCtx = canvas.getContext("2d");
        tempCtx.putImageData(new ImageData(imageDataArray, w , h), 0, 0);

        return canvas;
    }

    dynamicallyLoadScript();

})();
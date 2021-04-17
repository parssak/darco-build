const hueRotateAmount = 0.5;

export default async function invertImage(imageURL, canvas) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.crossOrigin = "";
        img.onload = draw;
        img.src = imageURL;

        /**
         *  Draws image onto canvas and inverts the image data.
         *  Had to manually input the invert and hue rotate here
         *  because webkit does not support canvas draw filters.
         *
         *  P.S. this canvas is hidden with CSS
         */
        function draw() {
            // let canvas = document.querySelector("#dark-canvas");
            // @ts-ignore
            let ctx = canvas.getContext("2d");
            // @ts-ignore
            canvas.width = img.width;
            // @ts-ignore
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // @ts-ignore
            let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let data = imageData.data;
            let invertAmount = 1;
            for (let i = 0; i < data.length; i += 4) {
                data[i + 0] = Math.abs(data[i + 0] - 255 * invertAmount);
                data[i + 1] = Math.abs(data[i + 1] - 255 * invertAmount);
                data[i + 2] = Math.abs(data[i + 2] - 255 * invertAmount);
            }


            const rotateAmount = hueRotateAmount;
            const h = (rotateAmount % 1 + 1) % 1; // wraps the angle to unit interval, even when negative
            const th = h * 3;
            const thr = Math.floor(th);
            const d = th - thr;
            const b = 1 - d;
            let ma, mb, mc;
            let md, me, mf;
            let mg, mh, mi;

            switch (thr) {
                case 0:
                    ma = b;
                    mb = 0;
                    mc = d;
                    md = d;
                    me = b;
                    mf = 0;
                    mg = 0;
                    mh = d;
                    mi = b;
                    break;
                case 1:
                    ma = 0;
                    mb = d;
                    mc = b;
                    md = b;
                    me = 0;
                    mf = d;
                    mg = d;
                    mh = b;
                    mi = 0;
                    break;
                case 2:
                    ma = d;
                    mb = b;
                    mc = 0;
                    md = 0;
                    me = d;
                    mf = b;
                    mg = b;
                    mh = 0;
                    mi = d;
                    break;
                default:
                    break;
            }
            // do the pixels
            let place = 0;
            // @ts-ignore
            for (let y = 0; y < canvas.height; ++y) {
                // @ts-ignore
                for (let x = 0; x < canvas.width; ++x) {
                    // @ts-ignore
                    place = 4 * (y * canvas.width + x);

                    const ir = data[place + 0];
                    const ig = data[place + 1];
                    const ib = data[place + 2];

                    data[place + 0] = Math.floor(ma * ir + mb * ig + mc * ib);
                    data[place + 1] = Math.floor(md * ir + me * ig + mf * ib);
                    data[place + 2] = Math.floor(mg * ir + mh * ig + mi * ib);
                }
            }

            ctx.putImageData(imageData, 0, 0);

            // TODO check if not webview, and if not, do this instead.
            // filter
            /*
            // @ts-ignore
            ctx.filter = "invert(1) hue-rotate(150grad)";
            // @ts-ignore
            */
            // @ts-ignore
            resolve(canvas.toDataURL('image/jpeg', 1));

            // resolve(canvas.toDataURL('image/jpeg', pdfQuality));
        }
    })
}
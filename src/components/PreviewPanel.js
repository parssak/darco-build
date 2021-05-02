import styled from 'styled-components';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { ReducerTypes, useDarco } from '../DarcoContext';
import { useEffect, useRef, useState } from 'react';
import invertImage from '../helpers/invertImage';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DarkPDF from './DarkPDF';
import LoadingModal from './LoadingModal'
import jsPDF from 'jspdf';


/**
 *  Takes all of the inverted images and returns them back into a pdf
 * @param imageArray: array of inverted images
 * @param orientation: 'p' for portrait, 'l' for landscape
 */
async function imagesToPDF(imageArray, orientation, data) {
    console.log("got >>", imageArray, data);
    return new Promise(resolve => {
        let doc = new jsPDF(orientation, 'mm');
        for (let i = 0; i < data.info.numPages; i++) {
            doc.addPage();
        }
        let finishedPages = 0;
        
        // while (finishedPages < data.info.numPages) {
            
        // }
        for (let i = 0; i < imageArray.length; i++) {
            // if (i !== imageArray.length - 1) doc.addPage();
            doc.setPage(i + 1);
            const imgData = imageArray[i];
            const width = doc.internal.pageSize.getWidth();
            const height = doc.internal.pageSize.getHeight();
            // const width = 
            // const height = 

            doc.setFillColor('#000000');
            doc.rect(0, 0, width, height);
            console.log('building page >> ',i, imgData?.byteData, width, height);
            if (imgData)
                doc.addImage(imgData, 0, 0, width, height);
        }
        let documentName = 'cool-doc.pdf';

        if (window.webkit) {
            window.webkit.messageHandlers.getDocumentName.postMessage(documentName.concat(".pdf"))
        }

        let fileReader = new FileReader()
        let base64;
        let blobPDF = new Blob([doc.output('blob')], { type: 'application/pdf' });
        fileReader.readAsDataURL(blobPDF);
        fileReader.onload = function (fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            resolve(base64);
            if (!window.webkit)
                doc.save(documentName.concat(".pdf"));
        }

    });
}
const Preview = styled.div`
    grid-area: preview;
    display: flex;
    justify-content: center;
    position: relative;
`
let currentBlobSize = 0;
const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

let children = []
let images = []
let texts= []

const PreviewPanel = ({width, height}) => {
    const { state, dispatch } = useDarco();
    const [numPages, setNumPages] = useState(0);
    const [completedImages, setCompletedImages] = useState([]);
    const [isBuilding, setIsBuilding] = useState(false);

    const docRef = useRef(null);
    const downloadRef = useRef(null);

    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf._pdfInfo.numPages);
        dispatch({ type: ReducerTypes.Ready, data: pdf._pdfInfo })
    }

    useEffect(() => {
        if (state.step <= ReducerTypes.Ready && completedImages.length > 0) {
            setCompletedImages([])
            children = []
            images = []
            setIsBuilding(false)
        }
    }, [completedImages, state]);

    // useEffect(() => {
    //     async function handleConvert() {
    //         console.log("called handle convert...")
    //         const finalBase64 = await imagesToPDF(completedImages, 'p', state);
    //         console.log("converted!!", finalBase64)
    //     }

    //     if (completedImages.length === numPages && completedImages.length > 0 && !isBuilding) {
    //         console.log("about to start building...")
    //         // BUILD
    //         handleConvert();
    //         setIsBuilding(true);
    //     }
    // }, [completedImages]);

    if (state.pdf === null)
        return null

    const storeCanvasRef = (canvasEl, index) => children[index] = canvasEl
    
    async function handleConvert() {
        console.log("called handle convert...")
        const finalBase64 = await imagesToPDF(images, 'p', state);
        console.log("converted!!", finalBase64)
    }
    
    const getDataURL = async e => {
        const index = e._pageIndex;
        invertImage(children[index]?.toDataURL(), children[index], state.options.theme).then(
            e => {
                images[index] = e;
                if (images.length === numPages && images.every(function (i) { return i !== null })) {
                    console.log("about to start building...")
                    handleConvert();
                }
            }
        )
    }
    return (
        <Preview>
            <Document
                className={'pdf'}
                file={state.pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
                inputRef={docRef}
            >
                {
                    width < 1000 ? 
                    <Page
                        key={`page_${0}`}
                        pageNumber={0 + 1}
                        width={width/2}
                        className={[state.options.theme, 'page']}
                        onLoadSuccess={e => dispatch({ type: ReducerTypes.DocumentDimensions, data: [e.originalWidth, e.originalHeight] })}
                        renderAnnotationLayer={false}
                        />
                        :
                        <Page
                            key={`page_${0}`}
                            pageNumber={0 + 1}
                            height={ height }
                            className={[state.options.theme, 'page']}
                            onLoadSuccess={e => dispatch({ type: ReducerTypes.DocumentDimensions, data: [e.originalWidth, e.originalHeight] })}
                            renderAnnotationLayer={false}
                        />
                }
                {
                    state.step === ReducerTypes.Loading &&
                    Array.from(
                        new Array(numPages),
                        (_, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                width={state.dimensions[0]}
                                height={state.dimensions[1]}
                                scale={2}
                                pageNumber={index + 1}
                                onGetTextSuccess={e => texts[index] = e}
                                className={['hidden']}
                                canvasRef={e => storeCanvasRef(e, index)}
                                onRenderSuccess={e => getDataURL(e)}

                            />
                        ),
                    )
                }
            </Document>
            {((state.step === ReducerTypes.Loading && width < 1000)) &&
                <LoadingModal/>
            }
            {/* {
                completedImages.length === numPages && completedImages.length > 0 &&

                <PDFDownloadLink document={<DarkPDF images={completedImages} dimensions={state.dimensions} texts={texts}/>} fileName={state.pdf.name}>
                    {({ blob, url, loading, error }) => {
                        if (blob && !loading) {
                            if (state.step !== ReducerTypes.Download || blob.size > currentBlobSize) {
                                currentBlobSize = blob.size;
                                setTimeout(() => {
                                    dispatch({
                                        type: ReducerTypes.ImagesConverted, data: {
                                            images: images,
                                            downloadRef: downloadRef.current
                                        }
                                    })
                                }, 2000)
                                
                            }
                            
                        }
                        return <button ref={downloadRef} style={{ display: 'none' }} >Download</button>
                    }
                    }
                </PDFDownloadLink>
            }
            {
                
            } */}
        </Preview>
    );
}

export default PreviewPanel;

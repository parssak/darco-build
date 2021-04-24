import styled from 'styled-components';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { ReducerTypes, useDarco } from '../DarcoContext';
import { useEffect, useRef, useState } from 'react';
import invertImage from '../helpers/invertImage';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DarkPDF from './DarkPDF';
import LoadingModal from './LoadingModal'


const Preview = styled.div`
    grid-area: preview;
    display: flex;
    justify-content: center;
    position: relative;
`

const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
};

let children = []
let images = []

const PreviewPanel = () => {
    const { state, dispatch } = useDarco()
    const [numPages, setNumPages] = useState(0);
    const [completedImages, setCompletedImages] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(0);
    /**
     * 
     */
    const docRef = useRef(null);
    const downloadRef = useRef(null);

    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf._pdfInfo.numPages);
        dispatch({ type: ReducerTypes.Ready, data: pdf._pdfInfo })
    }

    useEffect(() => {
        if (completedImages.length > 0 && downloadRef.current !== null) {
            console.log(completedImages)
            dispatch({
                type: ReducerTypes.ImagesConverted, data: {
                    images: images,
                    downloadRef: downloadRef.current
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [completedImages, downloadRef]);

    useEffect(() => {
        dispatch({type: ReducerTypes.Progress, data: loadingStatus / numPages})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingStatus]);
    
    if (state.pdf === null)
        return null
    
    const storeCanvasRef = (canvasEl, index) => children[index] = canvasEl

    const getDataURL = async e => {
        const index = e._pageIndex;
        invertImage(children[index]?.toDataURL(), children[index], state.options.theme.hueVal, state.options.theme.invertVal).then(
            e => {
                images[index] = e;
                setLoadingStatus(loadingStatus => loadingStatus + 1)
                if (images.length === numPages && images.every(function (i) { return i !== null })) {
                    setCompletedImages(images)
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
                    <Page
                        key={`page_${0}`}
                        pageNumber={0 + 1}
                        scale={0.8}
                        className={[state.options.theme, 'page']}
                        onLoadSuccess={e => dispatch({ type: ReducerTypes.DocumentDimensions, data: [e.originalWidth, e.originalHeight] })}
                    />
                }
                {
                    state.step === ReducerTypes.Loading &&
                    Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
                                width={state.dimensions[0]}
                                height={state.dimensions[1]}
                                scale={2}
                                pageNumber={index + 1}
                                onGetTextSuccess={e => console.log(e)}
                                className={['hidden']}
                                canvasRef={e => storeCanvasRef(e, index)}
                                onRenderSuccess={e => getDataURL(e)}

                            />

                        ),
                    )
                }
            </Document>
            {
                // state.completion >= 0 && <LoadingModal completion={state.completion}/>
            }
            {
                completedImages.length > 0 &&

                <PDFDownloadLink document={<DarkPDF images={completedImages} dimensions={state.dimensions} />} fileName={state.pdf.name}>
                    {({ blob, url, loading, error }) =>
                        <button ref={downloadRef} style={{ display: 'none' }}>download</button>
                    }
                </PDFDownloadLink>
            }
        </Preview>
    );
}

export default PreviewPanel;

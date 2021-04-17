import styled from 'styled-components';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { ReducerTypes, useDarco } from '../DarcoContext';
import {  useRef, useState } from 'react';
import invertImage from '../helpers/invertImage';
import { PDFDownloadLink } from '@react-pdf/renderer';
import DarkPDF from './DarkPDF';


const Preview = styled.div`
    flex-basis: content;
    flex-grow: 1;
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
const PDFPreview = () => {
    const { state, dispatch } = useDarco()
    const [numPages, setNumPages] = useState(0);
    const docRef = useRef(null);

    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf._pdfInfo.numPages);
        dispatch({ type: ReducerTypes.Info, data: pdf._pdfInfo })
        
    }

    if (state.pdf === null)
        return null
    
    const storeCanvasRef = (canvasEl, index) => {
        children[index] = canvasEl
        console.log('children', children)
    }

    const getDataURL = async (e) => {
        const index = e._pageIndex;
        //! Might not need to make this await
        let resultImage = await invertImage(children[index]?.toDataURL(), children[index])
        images[index] = resultImage;
        if (images.length === numPages && images.every(function (i) { return i !== null }))
        {
            dispatch({type: ReducerTypes.ImagesConverted, data: images})
        }
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
                        scale={1}
                        className={[state.options.theme, 'page']}
                    />
                }
                {
                    Array.from(
                        new Array(numPages),
                        (el, index) => (
                            <Page
                                key={`page_${index + 1}`}
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
                state.images !== null &&
                <PDFDownloadLink document={<DarkPDF images={state.images}/>} fileName={state.pdf.name}>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'Download now!'
                    }
                </PDFDownloadLink>
            }
        </Preview>
    );
}

export default PDFPreview;

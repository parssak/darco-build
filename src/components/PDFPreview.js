import styled from 'styled-components';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { ReducerTypes, usePdf } from '../DarcoContext';


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

const PDFPreview = () => {
    const { state, dispatch } = usePdf()
    function onDocumentLoadSuccess(pdf) {
        console.log(pdf)
        dispatch({ type: ReducerTypes.Info, data: pdf._pdfInfo})
    }

    if (state.pdf === null)
        return null
    
    return (
        <Preview>
            <Document
                className={'pdf'}
                file={state.pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
            >
                {
                    // Array.from(
                    //     new Array(numPages),
                    //     (el, index) => (
                    //         <Page
                    //             key={`page_${index + 1}`}
                    //             pageNumber={index + 1}
                    //         />
                    //     ),
                    // )
                    <Page
                        key={`page_${0}`}
                        pageNumber={0 + 1}
                        scale={0.8}
                        className={[state.options.theme, 'page']}
                    />
                    
                }
            </Document>
        </Preview>
    );
}

export default PDFPreview;

import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: lightgray;
`;

const LoaderMain = styled.div`
    z-index: 1020 !important;
    width: 75px;
    height: 75px;
    position: absolute;
    top: 50%;
    left: 50%;
    border: 10px solid #f3f3f3;
    border-left-color: #000000;
    border-radius: 50%;
    animation: spin 1.1s infinite linear;
`;

export default function Loader() {
    return (
        <>
            <LoaderWrapper>
                <LoaderMain></LoaderMain>
            </LoaderWrapper>
        </>
    );
}

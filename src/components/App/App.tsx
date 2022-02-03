import React from 'react';

import style from './App.module.scss';

import { Container } from "../Container/Container";
import { Editor } from "../Editor/Editor";

export const App = () => (
    <div className={ style.App }>
        <Container>
            <Editor/>
        </Container>
    </div>
);

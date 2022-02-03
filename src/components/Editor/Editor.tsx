import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';


import style from './Editor.module.scss';
import {useBuffer, useCaret} from "../../hooks";
import {Move} from "../../hooks/useCaret"

const getRenderedText = (text: string): string => text.replace(/ /g, '\xa0');

const getContent = (text: string, position: number, Caret: (text: string) => JSX.Element) => {
    const renderedText = getRenderedText(text);

    return (
        <>
            { renderedText.slice(0, position) }
            { Caret(renderedText.slice(position, position + 1)) }
            { renderedText.slice(position + 1) }
        </>
    );
};

export const Editor = () => {
    const { text, size, add, remove } = useBuffer();
    const { position, move, Caret } = useCaret({ size, position: 0 });

    const keyDownHandler = (event: React.KeyboardEvent) => {
        if (event.key === 'Backspace') {
            remove(position, 1);
            move(-1);
        }

        if (event.key === 'Tab') {
            add('  ', position + 1);
            move(2);
            event.preventDefault();
        }

        if (event.key === 'Enter') {
            add('\n', position + 1);
            move(1);
            event.preventDefault();
        }

        if (event.key === 'ArrowLeft') {
            move(-1, Move.SOFT);
        }

        if (event.key === 'ArrowRight') {
            move(1, Move.SOFT);
        }
    };

    const keyPressHandler = (event: React.KeyboardEvent) => {
        add(event.key, position + 1);
        move(1);
    };

    return (
        <SyntaxHighlighter language="html" style={vs}>
            { `<div>Hello</div>` }
        </SyntaxHighlighter >
    );
};

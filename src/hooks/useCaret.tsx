import React, {useState, useCallback} from "react";

import {Caret} from "../components/Caret/Caret";

export enum Move {
    HARD = "HARD",
    SOFT = "SOFT"
}

type caretContext = {
    size: number,
    position: number
};

type HighlightProps = {
    children: Array<JSX.Element | string>
};

const CaretWrapper = ({ children }: HighlightProps) => (
    <span style={ { position: "relative" } }>
        { children }
    </span>
);

export const useCaret = (context: caretContext) => {
    const { size } = context;

    const [position, setPosition] = useState(context.position);

    const move = useCallback(
        (count: number, type: Move = Move.HARD) => {
            setPosition((prevCaretPosition: number) => {
                const newPosition = prevCaretPosition + count;

                if (newPosition >= 0 && type === Move.HARD && newPosition <= size) {
                    return newPosition;
                }

                if (newPosition >= 0 && type === Move.SOFT && newPosition < size) {
                    return newPosition;
                }

                return prevCaretPosition;
            });
        },
        [size]
    );

    return {
        position,
        move,
        Caret: (text: string) => (
            <CaretWrapper>
                { text }
                <Caret/>
            </CaretWrapper>
        )
    };
};

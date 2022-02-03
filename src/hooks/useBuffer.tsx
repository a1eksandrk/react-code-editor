import {useCallback, useState} from "react";

type ChangeHandler = () => void;

const insertText = (text: string, insertedText: string, position: number): string => {
    return text.slice(0, position) + insertedText + text.slice(position);
};

const removeText = (text: string, position: number, count: number): string => {
    return text.slice(0, position) + text.slice(position + count);
};

export const useBuffer = () => {
    const [ text, setText ] = useState('');
    const [ handlers, setHandlers ] = useState([] as ChangeHandler[]);

    const add = useCallback(
        (text: string, position: number) => {
            setText((prevText: string) => insertText(prevText, text, position));
            handlers.forEach((handler: ChangeHandler) => handler());
        },
        [handlers]
    );

    const remove = useCallback(
        (position: number, count: number) => {
            setText((prevText: string) => removeText(prevText, position, count));
            handlers.forEach((handler: ChangeHandler) => handler());
        },
        [handlers]
    );

    const subscribeToChanges = useCallback(
        (handler: ChangeHandler) => {
            setHandlers((prevHandlers: ChangeHandler[]) => ([
                ...prevHandlers,
                handler
            ]));
        },
        []
    );

    return {
        text,
        size: text.length,
        add,
        remove,
        subscribeToChanges
    }
};

import React from 'react';

import style from './Container.module.scss';

type ContainerProps = {
    children: JSX.Element
}

export const Container = ({ children }: ContainerProps) => (
    <div className={ style.Container }>
        { children }
    </div>
);

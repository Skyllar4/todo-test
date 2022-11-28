import React from 'react';
import '../RightSideComponent/rightSideComponent.css';

interface RightSideComponentProps {
    children?: React.ReactNode;
}

export function RightSideContainer({children}: RightSideComponentProps) {
    return <div className='rightSideContainer'>
                {children}
          </div>
}
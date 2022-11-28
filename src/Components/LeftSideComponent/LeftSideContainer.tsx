import React from 'react';
import '../LeftSideComponent/leftSideComponent.css';

interface LeftSideContainerProps {
    children?: React.ReactNode
}

export function LeftSideContainer({children}: LeftSideContainerProps) {



    return <div className='leftSideContainer'>
                {children}
          </div>
}
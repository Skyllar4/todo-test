import React from 'react';
import '../DeleteComponent/deletebtn.css';

interface deleteButtonProps {
    isCheked: string
    deleteFn: (id: string) => void
    taskChekedId: string
}

export function DeleteComponent({isCheked, deleteFn, taskChekedId}: deleteButtonProps) {

    const handleClick = () => {
        deleteFn(taskChekedId);
    }
    
    return <button onClick={handleClick} className={isCheked !== '' ? "delete-button-view": 'delete-button-hidden'}>Удалить</button>

}
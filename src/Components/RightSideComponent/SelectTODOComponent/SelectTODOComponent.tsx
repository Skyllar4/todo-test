import React from 'react';
import { DeleteComponent } from './DeleteComponent/DeleteComponent';
import { UpdateComponent } from './UpdateComponent/UpdateComponent';
import { dataElementInterface } from '../../LayoutContainer/LayoutAppContainer';


interface dataArr<T> extends Array<T> {
    map<U>(fn: (el: T, index: number, arr: dataArr<T>) => U): dataArr<U> // типизирую метод, чтобы он мог работать с data
}

interface selectTodoProps<T> {
    data: dataArr<T>
    edit: (id: string, title: string, status: string, due_date: string) => void
    deleteDoc: (id: number) => void
}

export function SelectTODOComponent({data, edit, deleteDoc}: selectTodoProps<dataElementInterface>) {

    const [activeItem, setActiveItem] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setActiveItem(e.target.value);
    }

    const parrentCallEdit = (id: string, title: string, status: string, due_date: string) => {
        edit(id, title, status = "В процессе", due_date);
    }

    const parrentCallDelete = (id: string) => {
        deleteDoc(parseInt(id));
    }
    
    const selectItems = data.map((item: dataElementInterface) => <option key={item.id} value={item.id}>{item.due_date + item.status + item.title}</option>);

    return <> 
                <select onChange={handleChange}>
                        <option hidden>Выберите дело</option>
                        {selectItems}
                </select>
                <UpdateComponent isCheked={activeItem} editFn={parrentCallEdit} taskChekedId={activeItem} />
                <DeleteComponent isCheked={activeItem} deleteFn={parrentCallDelete} taskChekedId={activeItem}/>
          </>
}
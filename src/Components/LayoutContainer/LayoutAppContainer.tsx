import React from 'react';
import db from '../../firebase.config.js';
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, query, where, deleteDoc } from "firebase/firestore"; 
import '../LayoutContainer/mainLayout.css';
import { TODOListCOmponent } from '../LeftSideComponent/TODOListComponent/TODOLISTCOmponent';
import { LeftSideContainer } from '../LeftSideComponent/LeftSideContainer';
import { TODOCreateComponent } from '../LeftSideComponent/TODOCreateComponent/TODOCreateComponent';
import { RightSideContainer } from '../RightSideComponent/RightSideContainer';
import { SelectTODOComponent } from '../RightSideComponent/SelectTODOComponent/SelectTODOComponent';
import { updateApp } from '../../untils/updateApp';

const fetchTodos = async () => {
    const response= collection(db, 'todos');
    const data = await getDocs(response);
    return data;
} // Запрос данных из БД

const findTODO = async (id: number) => {

    const findDoc = query(collection(db, "todos"), where("id", "==", id));

    const querySnapShot = await getDocs(findDoc); // Получаем элемент по id

    let docId = '';
    
    const idFind = () => {
             querySnapShot.forEach((doc) => {
             docId = doc.id
    })};
    idFind();

    return docId;
}

export interface dataElementInterface {
    id: number,
    due_date: string,
    title: string,
    status: string
}


export function LayoutAppContainer() {

    const [data, setData] = React.useState(Array<dataElementInterface>);

    const TODOAdd = async (title: string, status: string = "В процессе", due_date: string) => {
        const docRef = doc(db, 'autoIncrements', 'Keys');
        const lastId = (await getDoc(docRef)).data(); // получение значения последнего id на основании таблицы autoincrements
        if (lastId !== undefined) {

            await updateDoc(docRef, {
                id: lastId.id + 1
            })
            await addDoc(collection(db, 'todos'), {
                id: lastId.id,
                title: title,
                status: status,
                due_date: due_date
            });

        } else {
            console.log('err')
        }
        updateApp(fetchTodos, setData);
    }

    const TODOEdit = async (id: string, title: string, status: string = "В процессе", due_date: string = "22-1111-111") => {
            const docId = await findTODO(parseInt(id));
            const docRef = doc(db, 'todos', docId); 
            await updateDoc(docRef, {
                title: title,
                status: status,
                due_date: due_date
            });
            updateApp(fetchTodos, setData);
    }

    const TODODelete = async (id: number) => {

        const docId = await findTODO(id);

       await deleteDoc(doc(db, 'todos', docId));
       updateApp(fetchTodos, setData);

    }

       React.useEffect(() => updateApp(fetchTodos, setData) , []);

    return <div className='main-container'>
                <LeftSideContainer>
                        <TODOCreateComponent add={TODOAdd}/>
                        <TODOListCOmponent data={data} />
                </LeftSideContainer>
                <RightSideContainer>
                        <SelectTODOComponent data={data} edit={TODOEdit} deleteDoc={TODODelete}/>
                </RightSideContainer>
          </div>

} // Логику построения приложения перенес в App, потому что тут будет храниться глобальное состояние
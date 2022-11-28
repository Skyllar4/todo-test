import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { dataElementInterface } from "../Components/LayoutContainer/LayoutAppContainer";

/* Функция принимает аргументами функции для получания данных и обновления состояния
    Вначале формируется массив, в которых будут скалдываться полученные из БД объекты
    Метод .data() предоставляет тип DocumentData отдельным элементом, поэтому 
    Сначала формируется объект, а затем он пушится в исходный массив, на выходе мы получеам массив объектов
    Этот массив объектов устанавливается в исходный state, с которым потом происходит работа
*/

export const updateApp = <T extends () => Promise<QuerySnapshot<DocumentData>>>(getData: T, setState: (arg: Array<dataElementInterface>) => void) => {
    const dataArray: Array<dataElementInterface> = [];
    getData().then(res => {
        res.forEach(item => {
            const dataElementParse = item.data();
            const dataEl: dataElementInterface = {id: dataElementParse.id, due_date: dataElementParse.due_date, title: dataElementParse.title, status: dataElementParse.status}
            dataArray.push(dataEl);
        });
        setState(dataArray);
    }).catch(res => res);
}
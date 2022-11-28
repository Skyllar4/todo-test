import React from 'react';
import { dataElementInterface } from '../../LayoutContainer/LayoutAppContainer';

interface TODOListInterface {
    data: Array<dataElementInterface>
}

export function TODOListCOmponent({data}: TODOListInterface) {

    const listItems = data.map((item: dataElementInterface) => <li key={item.id}>{item.title + " | " + item.status + " | " + item.due_date}</li>);

    return <ul>
               {listItems}
          </ul>

}
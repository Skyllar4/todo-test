import React from 'react';
import dayjs from 'dayjs';

interface TODOCreateProps {
    add: (title: string, status: string, due_date: string) => void
}

export function TODOCreateComponent({add}: TODOCreateProps) {

    const [TODOTitle, setTODOTitle] = React.useState('');

    const handleClick = () => {

        const nowYear = dayjs().get('year');
        const nowMonth = dayjs().month();
        const nowDay = dayjs().date();

        const dateArr = [nowDay, nowMonth, nowYear];

        add(TODOTitle, 'В процессе', dateArr.join('-'));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTODOTitle(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTODOTitle('');
    }
    
    return <form onSubmit={handleSubmit} action="#" method='POST'>
              <input onChange={handleChange} value={TODOTitle} type="text" placeholder='Введите дело'/>
              <button onClick={handleClick} type='submit' disabled={TODOTitle !== '' ? false : true}>Добавить дело</button>
          </form>

}
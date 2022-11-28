import React from 'react';
import '../UpdateComponent/update.css';
import dayjs from 'dayjs';

interface UpdateFormProps {
    isCheked: string
    editFn: (id: string, title: string, status: string, due_date: string) => void
    taskChekedId: string
}

export function UpdateComponent({isCheked, editFn, taskChekedId}: UpdateFormProps) {

    const [task, setTask] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent) => {
        const nowYear = dayjs().get('year');
        const nowMonth = dayjs().month();
        const nowDay = dayjs().date();

        const dateArr = [nowDay, nowMonth, nowYear];

        editFn(taskChekedId, task, "В процессе", dateArr.join('-'));
        console.log(taskChekedId)
        e.preventDefault();
        setTask('');
    } // Цепочка вызовов до родительского компонента Layout

    
    return <form onSubmit={handleSubmit} className={isCheked !== '' ? "update-form-view": 'update-form-hidden'} action="#" method='POST'>
                <textarea onChange={handleChange} value={task} name="update" placeholder='Введите дело' />
                <button type='submit' disabled={task !== '' ? false : true}>Редактировать</button>
           </form>

}
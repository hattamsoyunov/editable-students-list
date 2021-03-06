import React, { useState } from 'react';

import { TextField, MenuItem, TableRow, TableCell, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import progressList from '../utils/progressList';
import { IProgressList } from '../interfaces';

export interface Props {
    id?: string;
    name?: string;
    birthDay?: string;
    progress?: number;
    editing?: boolean;
    onSave: any;
    onCancel: any;
}

const StudentForm: React.FC<Props> = ({ id, name: editName, birthDay: editBirthDay, progress: editProgress, onSave, onCancel }) => {
    const [name, setName] = useState<string>(editName || '');
    const [birthDay, setBirthDay] = useState<Date | null | string>(editBirthDay || null);
    const [progress, setProgress] = useState<number | null>(editProgress || null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setName(e.target.value);
    };

    const handleBirthDayChange = (date: Date | null): void => {
        setBirthDay(date);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setProgress(parseInt(e.target.value));
    };

    return (
        <TableRow>
            <TableCell>
                <TextField label="ФИО" value={name} onChange={handleNameChange} fullWidth required />
            </TableCell>
            <TableCell>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                    <KeyboardDatePicker
                        views={['year', 'month', 'date']}
                        openTo="year"
                        format="dd.MM.yyyy"
                        label="Дата рождения"
                        value={birthDay}
                        onChange={handleBirthDayChange}
                        fullWidth
                        required
                    />
                </MuiPickersUtilsProvider>
            </TableCell>
            <TableCell>
                <TextField
                    select
                    label="Успеваемость"
                    className="input-wrap"
                    value={progress}
                    onChange={handleProgressChange}
                    fullWidth
                    required
                >
                    {progressList.map((progress: IProgressList) => (
                        <MenuItem key={progress.id} value={progress.id}>
                            {progress.label}
                        </MenuItem>
                    ))}
                </TextField>
            </TableCell>
            <TableCell>
                <IconButton
                    title="Сохранить"
                    onClick={() => onSave({ id, name, birthDay, progress })}
                    disabled={!name || !birthDay || !progress}
                >
                    <DoneIcon />
                </IconButton>
                <IconButton title="Отменить" onClick={() => onCancel(id)}>
                    <CloseIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

export default StudentForm;

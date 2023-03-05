'use client';
import type { DocFilter } from '@/utils/index';
import Link from 'next/link';
import { useState } from 'react';
import styles from './ClientSearchForm.module.css';

type ClientSearchFormProps = {
    onSubmit: (fields: DocFilter) => void;
    onClear?: () => void;
    initialFields?: {
        firstNameLower?: string;
        lastNameLower?: string;
        birthday?: string;
        filterByBirthday?: boolean;
    };
};
export default function ClientSearchForm(props: ClientSearchFormProps) {
    const { onSubmit, onClear, initialFields } = props;

    const defaultData = {
        firstName: '',
        lastName: '',
        birthday: new Date().toLocaleDateString('en-CA'),
        filterByBirthday: false,
    };

    const [clientData, setClientData] = useState({
        birthday: initialFields?.birthday || defaultData.birthday,
        filterByBirthday:
            initialFields?.filterByBirthday || defaultData.filterByBirthday,
        firstName: initialFields?.firstNameLower || '',
        lastName: initialFields?.lastNameLower || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fields: DocFilter = {};
        const { firstName, lastName, birthday, filterByBirthday } = clientData;
        if (firstName) fields['firstNameLower'] = firstName.toLowerCase();
        if (lastName) fields['lastNameLower'] = lastName.toLowerCase();
        if (filterByBirthday) {
            fields['birthday'] = birthday;
            fields['filterByBirthday'] = filterByBirthday;
        }
        // onSubmit callback from parent scope
        onSubmit(fields);
    };

    const handleClear = () => {
        setClientData(defaultData);
        if (onClear) onClear();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value: string | boolean = e.target.value;
        if (e.target.type === 'checkbox') value = e.target.checked;
        setClientData({ ...clientData, [e.target.name]: value });
    };

    return (
        <div className={styles.container}>
            <h1>Lookup Client</h1>

            <form onSubmit={handleSubmit}>
                <div className={styles.formContainer}>
                    <label>
                        First name
                        <input
                            type="text"
                            name="firstName"
                            value={clientData.firstName}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Last name
                        <input
                            type="text"
                            name="lastName"
                            value={clientData.lastName}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Birthday
                        <div className={styles.birthdayControlsContainer}>
                            <input
                                type="date"
                                name="birthday"
                                id="birthday"
                                value={clientData.birthday}
                                onChange={handleChange}
                            />
                            <input
                                type="checkbox"
                                name="filterByBirthday"
                                id="filterByBirthday"
                                checked={clientData.filterByBirthday}
                                onChange={handleChange}
                            />
                        </div>
                    </label>
                </div>

                <div className={styles.formControls}>
                    <button type="submit">Filter</button>
                    <button type="button" onClick={handleClear}>
                        Clear
                    </button>
                    <Link href="/add-client">
                        <button>New client</button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

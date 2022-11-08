'use client';

import Link from 'next/link';
import styles from './ClientCard.module.css';
interface ClientCardProps {
    id: string;
    firstName: string;
    lastName: string;
    notes: string;
}

export default function ClientCard({
    id,
    firstName,
    lastName,
    notes,
}: ClientCardProps) {
    return (
        <div className={styles.card}>
            <h1>{`${firstName} ${lastName}`}</h1>
            <h2>Notes:</h2>
            <p>{notes}</p>

            <br />
            <Link href={`/update/${id}`}>Edit</Link>
        </div>
    );
}
import { ClientCard, ClientCardSkeleton } from '@/components/Client/index';
import type { Client } from '@/models/index';
import styles from './ClientList.module.css';

type ClientListProps = {
    clients: Array<Client>;
    noDataMessage?: string;
    title?: string;
    isLoading?: boolean;
};

export default function ClientList(props: ClientListProps) {
    const {
        clients,
        noDataMessage = 'No Clients',
        title,
        isLoading = false,
    } = props;

    let clientList = <h1>{noDataMessage}</h1>;

    if (isLoading)
        clientList = (
            <div className={styles.clientListContainer}>
                <ClientCardSkeleton />
                <ClientCardSkeleton />
                <ClientCardSkeleton />
            </div>
        );

    if (clients?.length)
        clientList = (
            <>
                {clients.map((client) => (
                    <ClientCard client={client} key={client.id} />
                ))}
            </>
        );

    return (
        <div className={styles.clientListContainer}>
            <div>
                {title && <h1 className={styles.clientListTitle}>{title}</h1>}
                <div className={styles.clientListContainer}>{clientList}</div>
            </div>
        </div>
    );
}

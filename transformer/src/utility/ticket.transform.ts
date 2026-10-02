export interface Ticket {
    id: number;
    title: string;
    description: string | null;
    status: string;
    updatedAt: string;
}

export interface TicketDocument extends Partial<Ticket>{
    key: string;
    statusLabel: string;
    isOpen: boolean;
    indexedAt: string;
}

const STATUS_LABELS: Record<string, string> = {
    TODO: 'To do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Done'
};

export function toDocument(ticket: Ticket): TicketDocument {
    const {description, id, status, title, updatedAt} = ticket;
    return {
        description,
        id,
        indexedAt: new Date().toISOString(),
        isOpen: ticket.status !== 'DONE',
        key: `JIRA-${ticket.id}`,
        status,
        statusLabel: STATUS_LABELS[ticket.status] ?? ticket.status,
        title,
        updatedAt


    }
}
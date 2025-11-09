
export type Page = 'accueil' | 'services' | 'rendezvous' | 'diagnostic' | 'contact';

export interface NavLink {
    id: Page;
    label: string;
}

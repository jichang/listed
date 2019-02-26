export interface PaginatorParams {
    limit: number,
    offset: number,
}

export interface Collection<T> {
    total: number,
    items: T[],
}

export interface User {
    id: number,
    title: string,
    created_time: string,
    status: number,
}

export interface Topic {
    id: number,
    title: string,
    created_time: string,
    conclusions: Collection<Conclusion>,
    status: number,
}

export interface Conclusion {
    id: number,
    title: string,
    created_time: string,
    proofs: Collection<Proof>,
    status: number,
}

export interface Proof {
    id: number,
    content: string,
    created_time: string,
    status: number,
}

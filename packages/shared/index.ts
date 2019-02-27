export interface IPaginatorParams {
  limit: number;
  offset: number;
}

export interface ICollection<T> {
  total: number;
  items: T[];
}

export interface IUser {
  id: number;
  title: string;
  created_time: string;
  status: number;
}

export interface ITopic {
  id: number;
  title: string;
  created_time: string;
  conclusions: ICollection<IConclusion>;
  status: number;
}

export interface IConclusion {
  id: number;
  title: string;
  created_time: string;
  proofs: ICollection<IProof>;
  status: number;
}

export interface IProof {
  id: number;
  content: string;
  created_time: string;
  status: number;
}

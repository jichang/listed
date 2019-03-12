export interface IPaginatorParams {
  limit: number;
  offset: number;
}

export interface OAuthParams {
  code: string;
  state: string;
}

export interface ICollection<T> {
  total: number;
  items: T[];
}

export type Option<T> = T | null;

export type LoadingState = "idle" | "loading" | "succeed" | "failed";

export interface IUser {
  id: string;
  open_id: string;
  created_time: string;
  status: number;
}

export interface ISession {
  user: Option<IUser>;
}

export type TopicType = "public" | "private";

export interface ITopicCreateParams {
  title: string;
  description: string;
  type: TopicType;
}

export interface ITopic {
  id: string;
  title: string;
  description: string;
  type: TopicType;
  subscription: Option<ISubscription>;
  created_time: string;
  updated_time: string;
  status: number;
}

export interface IConclusionCreateParams {
  title: string;
  proofs: {
    content: string;
  }[];
}

export interface IConclusion {
  id: string;
  title: string;
  created_time: string;
  updated_time: string;
  proofs: ICollection<IProof>;
  status: number;
}

export interface IProof {
  id: string;
  content: string;
  created_time: string;
  updated_time: string;
  status: number;
}

export interface ISubscription {
  id: string;
  created_time: string;
  updated_time: string;
  status: number;
}

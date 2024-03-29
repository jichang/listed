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
  openId: string;
  createdTime: string;
  status: number;
}

export interface ISession {
  user: Option<IUser>;
}

export enum TopicType {
  PUBLIC = 0,
  PRIVATE = 1
}

export interface ITopicCreateParams {
  title: string;
  description: string;
  type: TopicType;
}

export interface ITopicQueryParams extends IPaginatorParams {
  keyword: string;
  category?: "subscribed" | "created";
}

export interface ITopic {
  id: string;
  title: string;
  description: string;
  type: TopicType;
  subscription: Option<ISubscription>;
  isOwner: boolean;
  createdTime: string;
  updatedTime: string;
  status: number;
}

export interface IConclusionCreateParams {
  title: string;
  proofs: {
    title: string,
    content: string;
  }[];
}

export interface IConclusion {
  id: string;
  isOwner: boolean;
  title: string;
  createdTime: string;
  updatedTime: string;
  proofs: ICollection<IProof>;
  status: number;
}

export interface IProof {
  id: string;
  isOwner: boolean;
  title: string;
  content: string;
  createdTime: string;
  updatedTime: string;
  status: number;
}

export interface ISubscription {
  id: string;
  createdTime: string;
  updatedTime: string;
  status: number;
}

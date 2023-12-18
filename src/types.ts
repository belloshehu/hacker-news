import { LegacyRef } from "react";
export type UserType = {
  email?: string;
  name: string;
};
export type LinkProp = {
  url: string;
  description: string;
  id: number;
  postedBy: UserType;
  votes: VoteType[];
  createdAt: string;
};

export type VoteType = {
  id: number;
  user: UserType;
  link: Link;
};

export type Link = {
  url: string;
  description: string;
  id: number;
  postedBy: UserType;
};

export type formProps = {
  submitBtnRef: LegacyRef<HTMLButtonElement>;
};

export type FeedType = {
  feed: {
    links: LinkProp[];
  };
};

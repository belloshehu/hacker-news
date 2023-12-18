import { LegacyRef } from "react";

export type LinkFormValues = {
  url: string;
  description: string;
};

export type formProps = {
  submitBtnRef: LegacyRef<HTMLButtonElement>;
};

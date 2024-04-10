import { Dispatch, SetStateAction } from "react";

export type AutocompletePropsType = {
  submitButtonLabel: string;
  handleSubmit: (fieldValue: string) => void;
  label: string;
};

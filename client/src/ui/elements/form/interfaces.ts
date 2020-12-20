import {ListboxOption} from "@react-md/form";

interface IButtonProps {
  sending: boolean;
  title: string;
}

interface ISelectOption {
  id: string;
  name: string;
}

interface ISelectProps {
  id: string;
  sending: boolean;
  options: ISelectOption[];
  value?: string | null | undefined;
  label: string;
}

export {IButtonProps, ISelectProps};
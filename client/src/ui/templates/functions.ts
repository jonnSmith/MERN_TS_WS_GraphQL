import {Ref} from "react";
import {TextFieldComponent} from "react-md/lib/TextFields/TextField";

const SetFloatingTextInputRefs = (refs: Array<Ref<TextFieldComponent>>) => {
  let timeout: NodeJS.Timeout;
  timeout = setTimeout(() => {
    refs.forEach((ref: Ref<TextFieldComponent>) => {
      try {
        // @ts-ignore
        ref.current.state.floating = true;
      } catch (e) {
        console.debug(e);
      }
    });
  }, 0);
  return () => {
    clearTimeout(timeout);
  };
};

export {SetFloatingTextInputRefs};

import {ConfigSettings} from "@appchat/core/config";
import {ISelectProps} from "@appchat/ui/elements/form/interfaces";
import {Select} from "@react-md/form";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDebounce} from "use-debounce";

const FormSelect = (props: ISelectProps) => {

  const {id, sending, options, value, label} = props;
  const [selectedState, setSelectedState] = useState(value);
  const [selected] = useDebounce(selectedState, ConfigSettings.client.form.debounce.value);

  useEffect(() => {
    if (!selectedState && options?.length || !options.some(o => o.id === selectedState)) { setSelectedState(options[0].id); }
    return () => {};
  }, [options, selectedState]);

  return <Select
    id={`${id}`}
    readOnly={sending}
    // @ts-ignore
    options={options}
    defaultChecked={true}
    labelKey="name"
    valueKey="id"
    value={selected || options[0].id}
    label={`${label}`}
    onChange={setSelectedState}
    error={!!(options?.length && (!value || !options.some(o => o.id === value)))}
    disableMovementChange={true}/>;
};

export {FormSelect};

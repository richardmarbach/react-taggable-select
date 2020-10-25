import React, { ReactElement, useReducer } from 'react';
import AsyncCreatable from 'react-select/async-creatable';
import {
  init,
  reducer,
  selectTag,
  TaggableSelectProps,
  TaggableSelectState,
  transition,
} from '../model/tag';

export function TaggableSelect(props: TaggableSelectProps): ReactElement {
  const { tags } = props;
  const [state, dispatch] = useReducer(reducer, tags, init);

  const onCreateOption = () => {
    dispatch(selectTag(state.current));
  };

  const loadOptions = (state: TaggableSelectState) => async (input: string) => {
    return transition(state, input);
  };

  const defaultCreatableProps = {
    isMulti: true,
    defaultOptions: true,
    loadOptions: loadOptions(state),
    isValidNewOption: () => true, //state.state === 'value',
    // TODO: Also run filters
    formatCreateLabel: () => state.current.label,
    onCreateOption: onCreateOption,
  };

  const creatableProps = Object.assign({}, defaultCreatableProps, props);

  return <AsyncCreatable {...creatableProps} />;
}

export interface TaggableOption {
  key: string;
  label: string;
}

export interface TaggableSelectProps {
  name?: string;
  placeholder?: string;
  tags: Tag[];
}

export type Validator = (value: string) => boolean;

export interface Tag extends TaggableOption {
  validators?: Validator[];
  options?: TaggableOption[];
}

export interface TagValue extends TaggableOption {
  value: string;
}

export interface TaggableSelectState {
  tags: Tag[];
  selected: TagValue[];
  current: TagValue;
}

export interface AddTagAction {
  type: 'add-tag';
  payload: Tag;
}

export function addTag(tag: Tag): AddTagAction {
  return {
    type: 'add-tag',
    payload: tag,
  };
}

export interface SelectTagAction {
  type: 'select-tag';
  payload: TagValue;
}

export function selectTag(tagValue: TagValue): SelectTagAction {
  return {
    type: 'select-tag',
    payload: tagValue,
  };
}

export interface UpdateTagAction {
  type: 'update-tag';
  payload: TagValue;
}

export function updateTag(tag: TagValue): UpdateTagAction {
  return {
    type: 'update-tag',
    payload: tag,
  };
}

export function createTagValue(
  key?: string,
  label?: string,
  value?: string,
): TagValue {
  return {
    key: key ?? '',
    label: label ?? '',
    value: value ?? '',
  };
}

export type TaggableSelectAction =
  | AddTagAction
  | SelectTagAction
  | UpdateTagAction;

export function init(tags: Tag[]): TaggableSelectState {
  return {
    tags: tags,
    selected: [],
    current: createTagValue(),
  };
}

export function reducer(
  state: TaggableSelectState,
  action: TaggableSelectAction,
): TaggableSelectState {
  switch (action.type) {
    case 'add-tag':
      return { ...state, tags: [...state.tags, action.payload] };
    case 'select-tag':
      return {
        ...state,
        selected: [...state.selected, action.payload],
        current: createTagValue(),
      };
    case 'update-tag':
      return {
        ...state,
        current: action.payload,
      };
  }
}

function findTagByKey(key: string, tags: Tag[]) {
  const currentTag = tags.find((tag) => tag.key === key);
  if (currentTag && currentTag.options) {
    return currentTag.options;
  }
  return [];
}

function startsWith(prefix: string) {
  return (tag: Tag) => {
    return tag.label.startsWith(prefix);
  };
}

export function transition(
  state: TaggableSelectState,
  input: string,
): TaggableOption[] {
  switch (Math.random() > 0.1 ? 'new' : 'value') {
    case 'new':
      return state.tags.filter(startsWith(input)).map(createOption);
    case 'value':
      return findTagByKey(state.current.key, state.tags);
    default:
      return [];
  }
}

export function createOption(tag: Tag): TaggableOption {
  return {
    label: tag.label,
    key: tag.key,
  };
}

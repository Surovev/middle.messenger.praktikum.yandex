import store, { StoreEvents } from '.';
import { BlockProps, Indexed } from '../../typings/types';

import Block from '../Block';
import isEqual from '../helpers/isEqual';

function connect(mapStateToProps: (state: Indexed, origProps: BlockProps) => Indexed) {
  return function (Component: any) {
    return class extends Component {
      constructor(props: BlockProps) {
        let state = mapStateToProps(store.getState(), props);
        super({ ...props, ...state });
        store.on(StoreEvents.EVENT_UPDATE, () => {
          console.log(state);
          const newState = mapStateToProps(store.getState(), props);
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }
          state = newState;
        });
      }
    };
  };
}

export const withAvatarURL = connect((state) => {
  if (state.user && state.user.avatar) {
    return {
      avatarURL: state.user.avatar,
    };
  }
  return {
    avatarURL: '',
  };
});

export const withAvatarAndName = connect((state) => {
  if (state.user) {
    return {
      avatarURL: state.user.avatar,
      name: `${state.user.first_name} ${state.user.second_name}`,
    };
  }
  return {
    avatarURL: '',
    name: '',
  };
});

// Settings fields are mapped as components, so it's easier to get their values separately using IDs
export const withProfileInfo = connect((state, props) => {
  if (state.user) {
    const { user } = state;
    const fieldName = props.id as string;
    const val = user[fieldName];
    return {
      value: val,
    };
  }

  return {
    value: '',
  };
});

export const withChats = connect((state) => ({
  chats: state.chats,
}));

export const withUserSearch = connect((state) => ({
  searchResults: state.userSearchResults,
}));

export const withCurrentChat = connect((state) => ({
  currentChat: state.currentChat,
}));

export const withMessages = connect((state) => ({
  messages: state.messages,
}));

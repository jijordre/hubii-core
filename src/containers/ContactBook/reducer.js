/*
 *
 * contacts reducer
 *
 */

import { fromJS } from 'immutable';

import {
  TRANSFER_SUCCESS,
} from 'containers/WalletHoc/constants';

import { updateRecentContacts } from 'utils/contacts';

import {
  REMOVE_CONTACT,
  EDIT_CONTACT,
  CREATE_CONTACT,
} from './constants';

export const initialState = fromJS({
  contacts: [],
  recentContacts: [],
}
);

function contactsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_CONTACT:
      return state
      .update('contacts', (contacts) => contacts.push(fromJS(action.contactDetails)));
    case REMOVE_CONTACT:
      return state
        .set('contacts', fromJS(action.remainingContacts))
        .set('recentContacts', fromJS(action.remainingRecentContacts));
    case EDIT_CONTACT:
      return state
        .set('contacts', fromJS(action.newContactsList))
        .set('recentContacts', fromJS(action.newRecentContactsList));
    case TRANSFER_SUCCESS: {
      const recentContacts = updateRecentContacts(state.get('contacts').toJS(), state.get('recentContacts').toJS(), action.transaction);
      return state
        .set('recentContacts', fromJS(recentContacts));
    }
    default:
      return state;
  }
}

export default contactsReducer;

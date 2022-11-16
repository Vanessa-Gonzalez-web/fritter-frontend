import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various compoentns.
 */
const store = new Vuex.Store({
  state: {
    filter: null, // Username to filter shown freets by (null = show all)
    freets: [], // All freets created in the app
    username: null, // Username of the logged in user
    alerts: {}, // global success/error messages encountered during submissions to non-visible forms
    contactDisplayed: null,
    contactNumber: null,
    contactEmail: null,
    contactWebsite: null,
    contactAddress: null,
    contactInformation: [],
    followers: [],
    following: []
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    updateFilter(state, filter) {
      /**
       * Update the stored freets filter to the specified one.
       * @param filter - Username of the user to fitler freets by
       */
      state.filter = filter;
    },
    updateFreets(state, freets) {
      /**
       * Update the stored freets to the provided freets.
       * @param freets - Freets to store
       */
      state.freets = freets;
    },
    async refreshFreets(state) {
      /**
       * Request the server for the currently available freets.
       */
      const url = state.filter ? `/api/users/${state.filter}/freets` : '/api/freets';
      const res = await fetch(url).then(async r => r.json());
      state.freets = res;
    },
    setContactDisplay(state, contactDisplayed) {
      /**
       * Update the stored contact information display status to the specified one.
       * @param contactDisplayed - new contact information display status to set
       */
      state.contactDisplayed = contactDisplayed;
    },
    setContactNumber(state, contactNumber) {
      /**
       * Update the stored contact information number to the specified one.
       * @param contactNumber - new contact information number to set
       */
      state.contactNumber = contactNumber;
    },
    setContactEmail(state, contactEmail) {
      /**
       * Update the stored contact information email to the specified one.
       * @param contactEmail - new contact information email to set
       */
      state.contactEmail = contactEmail;
    },
    setContactWebsite(state, contactWebsite) {
      /**
       * Update the stored contact information website to the specified one.
       * @param contactWebsite - new contact information website to set
       */
      state.contactWebsite = contactWebsite;
    },
    setContactAddress(state, contactAddress) {
      /**
       * Update the stored contact information address to the specified one.
       * @param contactAddress - new contact information address to set
       */
      state.contactAddress = contactAddress;
    },
    async getContactInformation(state, username) {
      /**
       * Request the server for the currently available contact information.
       */
       const url = `/api/contactInformationDisplay/?username=${username}`;
       const res = await fetch(url).then(async r => r.json());
       state.contactInformation = res;
    },
    setFollowers(state, followers) {
      /**
       * Request the server for the current followers of the given user.
       */
       state.followers = followers;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;

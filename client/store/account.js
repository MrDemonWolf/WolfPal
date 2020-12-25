export const state = () => ({
  showEnableTwoFactorModal: false,
  showDisableTwoFactorModal: false,
  twoFactorQrCode: '',
  twoFactorSecret: '',
  twofactorBackupCodes: [],
  sessions: [],
  messages: {
    success: undefined,
    error: undefined,
    errors: [],
  },
})

export const actions = {
  async FETCH_SESSIONS({ commit }) {
    const res = await this.$axios.$get('/api/account/sessions')
    commit('SET_SESSIONS', res.sessions)
  },
  TOGGLE_SHOW_ENABLE_TWO_FACTOR_MODAL({ state, commit }) {
    commit('SET_SHOW_ENABLE_TWO_FACTOR_MODAL', !state.showEnableTwoFactorModal)
  },
  TOGGLE_SHOW_DISABLE_TWO_FACTOR_MODAL({ state, commit }) {
    commit(
      'SET_SHOW_DISABLE_TWO_FACTOR_MODAL',
      !state.showDisableTwoFactorModal
    )
  },
  async SET_TWO_FACTOR_INITIALIZE({ commit }) {
    try {
      const res = await this.$axios.$post('/api/account/two-factor')
      commit('SET_TWO_FACTOR_QR_CODE', res.qrCode)
      commit('SET_TWO_FACTOR_SECRET', res.secret)

      commit('SET_TWO_FACTOR_BACKUP_CODES', res.backupCodes)
      commit('SET_MESSAGE_ERROR', undefined)
    } catch (e) {
      commit('SET_MESSAGE_SUCCESS', undefined)
      commit('SET_MESSAGE_ERROR', e.response.data.error)
    }
  },
  async ENABLE_TWO_FACTOR({ commit }, code) {
    try {
      const res = await this.$axios.$put('/api/account/two-factor', {
        code,
      })

      commit('SET_SHOW_ENABLE_TWO_FACTOR_MODAL', false)
      commit('RESET_TWO_FACTOR_INITIALIZE')

      commit('SET_MESSAGE_ERROR', undefined)
      commit('SET_MESSAGE_SUCCESS', res.message)
    } catch (e) {
      commit('SET_MESSAGE_SUCCESS', undefined)
      commit('SET_MESSAGE_ERROR', e.response.data.error)
    }
  },
  async DISABLE_TWO_FACTOR({ commit }, code) {
    try {
      const res = await this.$axios.$delete(
        `/api/account/two-factor?code=${code}`
      )

      commit('SET_MESSAGE_ERROR', undefined)
      commit('SET_MESSAGE_SUCCESS', res.message)
    } catch (e) {
      commit('SET_MESSAGE_SUCCESS', undefined)
      commit('SET_MESSAGE_ERROR', e.response.data.error)
    }
  },
  RESET_TWO_FACTOR_INITIALIZE({ commit }) {
    commit('SET_TWO_FACTOR_QR_CODE', '')
    commit('SET_TWO_FACTOR_SECRET', '')
    commit('SET_TWO_FACTOR_BACKUP_CODES', [])
  },
  async REVOKE_SESSION({ commit, state }, index) {
    try {
      const res = await this.$axios.$delete(
        `/api/account/sessions/${state.sessions[index]._id}`
      )

      commit('DELETE_SESSION', index)

      commit('SET_MESSAGE_ERROR', undefined)
      commit('SET_MESSAGE_SUCCESS', res.message)
    } catch (e) {
      commit('SET_MESSAGE_SUCCESS', undefined)
      commit('SET_MESSAGE_ERROR', e.response.data.error)
    }
  },
}

export const mutations = {
  SET_SESSIONS(state, sessions) {
    return (state.sessions = sessions)
  },
  SET_SHOW_ENABLE_TWO_FACTOR_MODAL(state, status) {
    return (state.showEnableTwoFactorModal = status)
  },
  SET_SHOW_DISABLE_TWO_FACTOR_MODAL(state, status) {
    return (state.showDisableTwoFactorModal = status)
  },
  SET_TWO_FACTOR_QR_CODE(state, qrCode) {
    return (state.twoFactorQrCode = qrCode)
  },
  SET_TWO_FACTOR_SECRET(state, secret) {
    return (state.twoFactorSecret = secret)
  },
  SET_TWO_FACTOR_BACKUP_CODES(state, codes) {
    return (state.twoFactorBackupCodes = codes)
  },
  DELETE_SESSION: (state, index) => {
    return state.sessions.splice(index, 1)
  },
  SET_MESSAGE_SUCCESS: (state, success) => {
    return (state.messages.success = success)
  },
  SET_MESSAGE_ERROR: (state, error) => {
    return (state.messages.error = error)
  },
  SET_MESSAGE_ERRORS: (state, errors) => {
    return (state.messages.errors = errors)
  },
}

export const getters = {
  SESSIONS: (state) => {
    return state.sessions
  },
  SHOW_ENABLE_TWO_FACTOR_MODAL: (state) => {
    return state.showEnableTwoFactorModal
  },
  SHOW_DISABLE_TWO_FACTOR_MODAL: (state) => {
    return state.showDisableTwoFactorModal
  },
  TWO_FACTOR_QR_CODE: (state) => {
    return state.twoFactorQrCode
  },
  TWO_FACTOR_SECRET: (state) => {
    return state.twoFactorSecret
  },
  TWO_FACTOR_BACKUP_CODES: (state) => {
    return state.twoFactorBackupCodes
  },
  MESSAGE_SUCCESS: (state) => {
    return state.messages.success
  },
  MESSAGE_ERROR: (state) => {
    return state.messages.error
  },
  MESSAGE_ERRORS: (state) => {
    return state.messages.errors
  },
}

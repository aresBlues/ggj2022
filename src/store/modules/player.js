const state = {
	score: 0,
	volume: 0.5,
	previousVolume: 0,
	muted: false
}

const mutations = {
	scorePoints (state, amount) {
		state.score += amount
	},
	updateSound (state, { volume, previousVolume, muted }) {
		state.volume = volume
		state.previousVolume = previousVolume
		state.muted = muted
	}
}

const actions = {
	scorePoints ({ commit }, amount) {
		commit('scorePoints', amount)
	},
	updateSound ({ commit }, payload) {
		commit('updateSound', payload)
	}
}

const getters = {
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}

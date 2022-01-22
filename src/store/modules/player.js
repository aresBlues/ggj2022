const state = {
	score: 0
}

const mutations = {
	scorePoints (state, amount) {
		state.score += amount
	}
}

const actions = {
	scorePoints ({ commit }, amount) {
		commit('scorePoints', amount)
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

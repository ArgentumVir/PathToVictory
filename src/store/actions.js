// actions.js

const actions = {
	setUsername: ({ commit }, name) => {
		commit('setUsername', {
			username: name
		});
	}
}

export default actions;

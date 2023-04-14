import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            facilities: [],
            cities: [
                {
                    id: 1,
                    name: "Warszawa"
                  },
                  {
                    id: 2,
                    name: "Łódź"
                  },
                  {
                    id: 3,
                    name: "Gdańsk"
                  },
                  {
                    id: 4,
                    name: "Białystok"
                  },
                  {
                    id: 5,
                    name: "Kraków"
                  }
            ]
        }
    },
    mutations,
    actions,
    getters
}


import { apiClient } from '../lib/api'

export const SearchService = {
    getAll: () =>
        apiClient('/search/get-all'),

    getInfo: (searchId: string) => {
        return apiClient(`/search/info?search_id=${searchId}`)
    },
        
    add: (data: object) =>
        apiClient('/search/add', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    delete: (ids: string[]) =>
        apiClient('/search/delete', {
            method: 'DELETE',
            body: JSON.stringify({ searches: ids }),
        }),

    searchGeo: (ip: string) => {
        return apiClient(`/home/search?ip=${ip}`)
    },

    getUserGeo: () => {
        return apiClient('/home/user')
    }
}
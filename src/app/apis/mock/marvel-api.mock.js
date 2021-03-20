module.exports = {
    getCharacters: async (limit, offset) => {
        return Promise.resolve({
            data: {
                results: [
                    { id: 1 }
                ]
            }
        })
    },
    getCharacterDetail: async (id) => {
        return Promise.resolve({
            data: {
                results: [
                    { id: 1, name: 'Lorem', description: 'Ipsum' }
                ]
            }
        })
    }
}
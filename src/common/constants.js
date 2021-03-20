module.exports = Object.freeze({
    // in-memory cache keys
    cacheKeys: {
        characters: (limit, offset) => `characters?limit=${limit}&offset=${offset}`,
        characterDetail: (id) => `characters/${id}`,
    }
});

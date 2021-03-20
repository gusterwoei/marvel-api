const characterService = require('./character.service')

describe('Test Character service', () => {

    it('/characters should fail with invalid params', async () => {
        await expect(characterService.getCharacters(-1, 0)).rejects.toThrow()
        await expect(characterService.getCharacters(0, 0)).rejects.toThrow()
        await expect(characterService.getCharacters(100, -1)).rejects.toThrow()
    })

    it('/characters should be successful', async () => {
        await expect((await characterService.getCharacters(100, 0)).length).toBeGreaterThan(0)
        await expect(characterService.getCharacters(100, 100)).resolves.not.toThrow()
    })

    it('get characters detail should be successful', async () => {
        await expect(characterService.getCharacterDetail(100001)).resolves.not.toThrow()
        
        let result = await characterService.getCharacterDetail(100001)
        expect(result.id).not.toBeNull()
        expect(result.name).not.toBeNull()
        expect(result.description).not.toBeNull()
    })

})
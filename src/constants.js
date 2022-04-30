const CONTRACT_ADDRESS = "0xFa738Db0411D887Ae03ef450100eF81F8beAbcF3";

const transformCharacterData = (characterData) => {
    return {
        name: characterData.name,
        imageURI: "https://cloudflare-ipfs.com/ipfs/" + characterData.imageURI,
        hp: characterData.hp.toNumber(),
        maxHp: characterData.maxHp.toNumber(),
        attackDamage: characterData.attackDamage.toNumber()
    }
}

export {CONTRACT_ADDRESS, transformCharacterData};
const CONTRACT_ADDRESS = "0xFb14948fDcBfa735f9adED7069891D57e5F29c8d";

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
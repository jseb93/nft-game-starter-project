const CONTRACT_ADDRESS = "0x1598f366ceE4fdb4395a0BbC86DaD535DcF1488a";

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
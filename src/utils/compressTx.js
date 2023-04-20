
const compressTx = (txJson) => {

    const balances = new Map();
    txJson.inputs.forEach(input => {
        const nerg = -1 * input.value
        if (balances.get(input.address) === undefined) {
            balances.set(input.address, new Map())
        }
        const addrBal = balances.get(input.address)
        if (addrBal.get("nerg") === undefined) {
            addrBal.set("nerg", nerg)
        } else {
            addrBal.set("nerg", nerg + addrBal.get("nerg"))
        }
        input.assets.forEach(ass => {
            const amount = -1 * ass.amount;
            if (!addrBal.has(ass.tokenId)) {
                addrBal.set(ass.tokenId, amount)
            } else {
                addrBal.set(ass.tokenId, amount + addrBal.get(ass.tokenId))
            }
        });
    })
    txJson.outputs.forEach(output => {
        const nerg = output.value
        if (balances.get(output.address) === undefined) {
            balances.set(output.address, new Map())
        }
        const addrBal = balances.get(output.address)
        if (addrBal.get("nerg") === undefined) {
            addrBal.set("nerg", nerg)
        } else {
            addrBal.set("nerg", nerg + addrBal.get("nerg"))
        }
        output.assets.forEach(ass => {
            const amount = ass.amount;
            if (!addrBal.has(ass.tokenId)) {
                addrBal.set(ass.tokenId, amount)
            } else {
                addrBal.set(ass.tokenId, amount + addrBal.get(ass.tokenId))
            }
        });
    })
    const inputs = new Map();
    balances.forEach((bal, balKey, balMap) => {
        bal.forEach((ass, assKey, assMap) => {
            if (ass < 0) {
                if (!inputs.has(balKey)) {
                    inputs.set(balKey, new Map())
                }
                inputs.get(balKey).set(assKey, ass * -1)
            }
        })
    })
    const tokens = new Set();
    const jsonInputs = []
    inputs.forEach(
        (value, address, map) => {
            const assets = []
            value.forEach((amount, tokenName, assMap) => {
                assets.push({
                    tokenName: tokenName,
                    amount: amount
                })
                if (tokenName !== "nerg") {
                    tokens.add(tokenName)
                }
            })
            jsonInputs.push({
                address: address,
                assets: assets
            })
        }
    )
    const outputs = new Map();
    balances.forEach((bal, balKey, balMap) => {
        bal.forEach((ass, assKey, assMap) => {
            if (ass > 0) {
                if (!outputs.has(balKey)) {
                    outputs.set(balKey, new Map())
                }
                outputs.get(balKey).set(assKey, ass)
            }
        })
    })
    const jsonOutputs = []
    outputs.forEach(
        (value, address, map) => {
            const assets = []
            value.forEach((amount, tokenName, assMap) => {
                assets.push({
                    tokenName: tokenName,
                    amount: amount
                })
                if (tokenName !== "nerg") {
                    tokens.add(tokenName)
                }
            })
            jsonOutputs.push({
                address: address,
                assets: assets
            })
        }
    )
    return {
        id: txJson.id,
        timestamp: txJson.timestamp,
        inclusionHeight: txJson.inclusionHeight,
        tokens: tokens,
        inputs: jsonInputs,
        outputs: jsonOutputs
    };
}

export default compressTx
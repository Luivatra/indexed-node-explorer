import 'assets/TxPart.css'
import Icons from 'data/Icons';
import icons from 'data/Icons'

const minerAddress = "2iHkR7CWvD1R4j1yZg5bkeDRQavjAaVPeTDFGGLZduHyfWMuYpmhHocX8GJoaieTx78FntzJbCBVL6rf96ocJoZdmWBL2fci7NqWgAirppPQmZ7fN9V6z13Ay6brPriBKYqLp1bT2Fk4FkFLCfdPpe"

function truncateAddress(address) {
    return (address.length > 52) ? address.slice(0, 23) + '...' + address.slice(address.length - 23, address.length - 1) : address;
};

function getClassName(address, highlightedAddress) {
    switch (address) {
        case highlightedAddress:
            return "TxPart Highlighted";
        case minerAddress:
            return "TxPart Miner";
        default:
            if (address.length > 51 || address.length < 51) {
                return "TxPart SC";
            } else {
                return "TxPart";
            }
    }
}

const TxPart = (txId, txData, tokenInfoMap, highlightedAddress) => {
    const assetItems = txData.assets.map(asset => {
        const tokenInfo = tokenInfoMap.has(asset.tokenName) ? tokenInfoMap.get(asset.tokenName) : asset.tokenName === "nerg" ? { name: "ergo", decimals: 9 } : { name: asset.tokenName, decimals: 0 }
        const tokenIcon = Icons(tokenInfo.name)
        const tokenIdentifier = tokenIcon !== undefined ? <img src={tokenIcon} alt={tokenInfo.name} style={{ width: 30, height: 30 }} /> : tokenInfo.name
        return <tr><td>{tokenIdentifier}</td><td>{asset.amount / (10 ** tokenInfo.decimals)}</td></tr>
    }
    );
    return (
        <a href={'/address/' + txData.address}>
            <div className={getClassName(txData.address, highlightedAddress)} id={txData.address + txId}>
                {truncateAddress(txData.address)}<br />
                <table className="assetList">
                    <tbody>
                        {assetItems}
                    </tbody>
                </table>
            </div>
        </a>
    );
}

export default TxPart
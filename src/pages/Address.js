import TxPart from 'components/ui/TxPart'
import Tx from 'components/ui/Tx'
import 'assets/Transaction.css'
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";
import { useEffect, useState } from 'react';
import compressTx from 'utils/compressTx';
import { useParams } from 'react-router';

const Address = () => {
    const { address } = useParams();
    const [totalTx, setTotalTx] = useState(undefined);
    const [cTransactions, setCTransactions] = useState(undefined);
    const [tokenInfo, setTokenInfo] = useState([]);
    const [transactions, setTransactions] = useState(undefined);
    const addToken = (tokenId) => {
        fetch('/blockchain/token/byId/' + tokenId)
            .then((response) => response.json())
            .then((data) => setTokenInfo(prevState => { return [...prevState, data] }))
    }
    useEffect(() => {
        fetch('/blockchain/transaction/byAddress?offset=0&limit=1', {
            method: 'POST',
            body: address
        })
            .then((response) => response.json())
            .then((data) => setTotalTx(data.total))
    }, []);
    useEffect(() => {
        if (!(totalTx === undefined)) {
            fetch('/blockchain/transaction/byAddress?offset=' + (totalTx - totalTx) + '&limit=50', {
                method: 'POST',
                body: address
            })
                .then((response) => response.json())
                .then((data) => {
                    const tokens = new Set();
                    const txs = data.items.map(tx => {
                        const compressedTx = compressTx(tx);
                        compressedTx.tokens.forEach(token => tokens.add(token))
                        return compressedTx;
                    });
                    const tokensArr = Array.from(tokens);
                    tokensArr.forEach(token => addToken(token))
                    setCTransactions(txs);
                });
        }
    }, [totalTx]);
    useEffect(() => {
        if (!(cTransactions === undefined)) {
            const tokenInfoMap = new Map(tokenInfo.map(
                ti => [ti.id, ti]
            ))
            const txs = cTransactions.map(ctx => Tx(ctx, tokenInfoMap, address))
            setTransactions(txs)
        }
    }, [cTransactions, tokenInfo]);
    return (
        <div>
            {transactions}
        </div>
    );
}


export default Address
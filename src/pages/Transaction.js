import TxPart from 'components/ui/TxPart'
import Tx from 'components/ui/Tx'
import 'assets/Transaction.css'
import { useEffect, useState } from 'react';
import compressTx from 'utils/compressTx';
import { useParams } from 'react-router';

const Transaction = () => {
    const { id } = useParams();
    const [transaction, setTransaction] = useState([]);
    useEffect(() => {
        fetch('/blockchain/transaction/byId/' + id)
            .then((response) => response.json())
            .then((data) => {
                const compressedTx = compressTx(data);
                setTransaction(Tx(compressedTx))
            });
    }, []);
    return (
        <div>
            {transaction}
        </div>
    );
}


export default Transaction
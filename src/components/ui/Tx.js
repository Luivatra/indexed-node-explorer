import 'assets/Transaction.css';
import TxPart from 'components/ui/TxPart';
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";

const Tx = (compressedTx, tokenInfoMap, highlightedAddress) => {
    const inputs = compressedTx.inputs.map(input => TxPart(compressedTx.id + "input", input, tokenInfoMap, highlightedAddress));
    const inputArrows = compressedTx.inputs.map(input =>
        <Xarrow
            start={input.address + compressedTx.id + "input"}
            end={"txCenter" + compressedTx.id}
            showHead={false}
        />)
    const outputs = compressedTx.outputs.map(output => TxPart(compressedTx.id + "output", output, tokenInfoMap, highlightedAddress));
    const outputArrows = compressedTx.outputs.map(output =>
        <Xarrow
            start={"txCenter" + compressedTx.id}
            end={output.address + compressedTx.id + "output"}
        />)
    return (
        <table className='Transaction'>
            <thead>
                <tr><td colspan="3">
                    <div className='TxSide'>
                        <table width="100%"><tbody><tr><td width="33%"><div align="left" style={{ whiteSpace: "nowrap" }}>
                            TxId: {compressedTx.id}
                        </div></td>
                            <td width="34%"><div align="center" style={{ whiteSpace: "nowrap" }}>
                                Height: {compressedTx.inclusionHeight}
                            </div></td><td width="33%"><div align="right" style={{ whiteSpace: "nowrap" }}>
                                Time: {(new Date(compressedTx.timestamp)).toLocaleString()}
                            </div></td></tr></tbody></table>
                    </div>
                </td></tr>
                <tr><td className="Transaction-inputs-column">Input</td><td className="Transaction-center-column"></td><td className="Transaction-outputs-column">Output</td></tr>
            </thead>
            <tbody>
                <tr key={"tx" + compressedTx.id}>
                    <td className="Transaction-inputs-column">
                        <div className='TxSide'>
                            {inputs}
                        </div>
                        {inputArrows}
                    </td>
                    <td className="Transaction-center-column">
                        <div id={"txCenter" + compressedTx.id}></div>
                    </td>
                    <td className="Transaction-outputs-column">
                        <div className='TxSide'>
                            {outputs}
                        </div>
                        {outputArrows}
                    </td>
                </tr>
            </tbody>
        </table >
    );
}


export default Tx
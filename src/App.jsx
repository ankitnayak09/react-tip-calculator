import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [bill, setBill] = useState("");
	const [tip, setTip] = useState("10%");
	const [split, setSplit] = useState(1);
	const [splitTotal, setSplitTotal] = useState(0);

	function handleTipChange(e) {
		let value = e.target.value.replace("%", "");
		if (value.indexOf("%") === -1) {
			value += "%";
		}
		setTip(value);
	}

	function handleSplit(e) {
		switch (e.target.innerText) {
			case "+":
				setSplit(split + 1);
				break;
			case "-":
				if (split === 1) {
					return;
				} else {
					setSplit(split - 1);
				}
				break;
		}
	}

	function handleBillChange(e) {
		setBill(e.target.value);
	}
	function calculate() {
		const percentage = 1 + parseInt(tip.replace("%", "")) / 100;
		const result = ((bill * percentage) / split).toFixed(2);
		setSplitTotal(result);
	}

	useEffect(() => {
		calculate();
	}, [bill, tip, split]);
	return (
		<div>
			<label>Bill Total</label>
			<input
				type="text"
				placeholder={"0.00"}
				value={bill}
				onChange={(e) => handleBillChange(e)}
			/>
			<label>Tip</label>
			<input
				type="text"
				placeholder={"10%"}
				value={tip}
				onChange={handleTipChange}
			/>
			<div className="summary">
				<div className="split">
					<label htmlFor="">Split</label>
					<div className="split-control">
						<button onClick={handleSplit}>-</button>
						<span>{split}</span>
						<button onClick={handleSplit}>+</button>
					</div>
				</div>
				<div className="result">
					<label htmlFor="">Split Total</label>
					<span>{splitTotal}</span>
				</div>
			</div>
		</div>
	);
}

export default App;

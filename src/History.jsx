import React from 'react';
import './History.css';

const History = ({records}) => {
	const placeholder = (
		<div className="placeholder">
			Previous guessed words and number of hit letters will be recorded here.
		</div>
		);

	const recordsList = records.map( (record, index) => {
		return (
			<div className="record" key={index}>
				<span>{index}</span>
				<span>{record.guess}</span>
				<span>{record.similar}</span>
			</div>
		);
	});

	return (
		<div className="history">
			<div className="title">
				<span>Turn</span>
				<span>Word</span>
				<span>Hit</span>
			</div>
			<div className="records">
				{records.length === 0 ? placeholder : recordsList}
			</div>
		</div>
	);
};

export default History;
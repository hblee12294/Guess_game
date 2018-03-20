import React from 'react';
import './Billboard.css';

const Billboard = ({count, winStatus}) => {
	const message = {
		win: `Congratulations! You win in ${count} turns`,
		count: `${count} of turns taken`
	}

	return (
		<div className="billboard">
			{winStatus ? message.win : message.count}
		</div>
	);
};

export default Billboard;
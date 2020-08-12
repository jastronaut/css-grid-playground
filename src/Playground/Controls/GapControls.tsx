import React, { useState } from 'react';

interface GapControlsProps {
	rowGap: string;
	colGap: string;
	setRowGap: (v: string) => void;
	setColGap: (v: string) => void;
}

const GapControls: React.FC<GapControlsProps> = ({ rowGap, colGap, setRowGap, setColGap }) => {
	const [newColGap, setNewColGap] = useState<string>(colGap);
	const [newRowGap, setNewRowGap] = useState<string>(rowGap);

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setColGap(newColGap.trim());
		setRowGap(newRowGap.trim());
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<label htmlFor='col-gaps'>Set column gaps: </label>
				<input type='text' name='col-gaps' value={newColGap} onChange={e => setNewColGap(e.target.value)} />

				<label htmlFor='row-gaps'>Set row gaps: </label>
				<input type='text' name='row-gaps' value={newRowGap} onChange={e => setNewRowGap(e.target.value)} />

				<button type='submit' name='change-gaps' value='change-gaps'>Change gaps</button>
			</form>
		</div>
	);
}

export default GapControls;
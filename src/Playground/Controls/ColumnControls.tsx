import React, { useState } from 'react';
import { Column } from '../interfaces';


interface ColumnConfigProps extends Column {
	index: number;
	setColSize: (index: number, newSize: string) => void;
	checkCSSUnits: (str: string) => boolean;
}

const ColumnConfig: React.SFC<ColumnConfigProps> = ({ size, index, setColSize, checkCSSUnits }) => {

	const [newSize, setNewSize] = useState(size);
	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (checkCSSUnits(newSize.trim()))
		setColSize(index, newSize.trim());
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<label htmlFor={`col-${index}-size`}>Column {index + 1} size: </label><input type="text" name={`col-${index}-size`} value={newSize} onChange={(e) => setNewSize(e.target.value)} />
			</form>
			<br />
		</div>
	);
}


interface ColumnControlsProps {
	columns: Column[];
	addColumn: () => void;
	setNewColSize: (s: string) => void;
	newColSize: string;
	handleFormSubmit: (e: React.SyntheticEvent) => void;
	setColSize: (index: number, s: string) => void;
	deleteLastColumn: () => void;
	checkCSSUnits: (str: string) => boolean;
}

const ColumnControls: React.FC<ColumnControlsProps> = ({ columns, addColumn, setNewColSize, newColSize, deleteLastColumn, handleFormSubmit, setColSize, checkCSSUnits }) => {
	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (checkCSSUnits(newColSize.trim())) addColumn();
	}
	return (
		<div>
			<h3>Control columns</h3>

			<p>Number of Columns: {columns.length}</p>

			<form onSubmit={onSubmit}>
				{`New column size: `}
				<input type="text" onChange={(e) => setNewColSize(e.target.value)} value={newColSize} />

				<button value="addColumn" type='submit'>
					Add column
				</button>
			</form>
			<br />

			{
				columns.map((c, i) =>
					(<ColumnConfig
						key={'col' + i}
						index={i}
						{...c}
						setColSize={setColSize}
						checkCSSUnits={checkCSSUnits}
					/>))
			}

			<br />
			{columns.length > 1 &&
				<button name='delete-column' onClick={deleteLastColumn}>Delete last column</button>}
			<br />
		</div>


	);
}

export default ColumnControls;
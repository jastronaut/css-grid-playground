import React, { useState } from 'react';
import { Box } from '../interfaces';

interface BoxControlsProps {
	addBox: () => void;
	setNewBoxName: (newName: string) => void;
	newBoxName: string;
	implicitRowHeight: string;
	isRowHeightImplicit: boolean;
	setIsRowHeightImplicit: (b: boolean) => void;
	setImplicitRowHeight: (h: string) => void;
	boxes: Box[];
	numCols: number;
	numRows: number;
	handleFormSubmit: (e: React.SyntheticEvent) => void;
	setExplicitRowHeight: (index: number, newSize: string) => void;
	explicitRowHeights: string[];
	setBoxPosition: (id: string, position: string, value: string) => void;
	checkCSSUnits: (str: string) => boolean;
}

interface RowHeightsControllerProps {
	index: number;
	setRowHeight: (index: number, newHeight: string) => void;
	rowHeight: string;
	checkCSSUnits: (str: string) => boolean;
}

const RowHeightsController: React.FC<RowHeightsControllerProps> = ({ index, setRowHeight, rowHeight, checkCSSUnits }) => {
	const [newRowHeight, setNewRowHeight] = useState<string>(rowHeight);

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (checkCSSUnits(newRowHeight.trim()))
			setRowHeight(index, newRowHeight.trim());
	}

	return (
		<form onSubmit={onSubmit}>
			<label htmlFor={`new-row-${index + 1}-height`}>Row {index + 1} height </label>

			<input type='text' name={`new-row-${index + 1}-height`} value={newRowHeight} onChange={(e) => setNewRowHeight(e.target.value)} />
			<br />
		</form>
		);
}

const createPositionOptions = (numPositions: number) => {
	const options = [(<option value='auto'>auto</option>)];
	for (let i = 1; i < numPositions + 1; i++) {
		options.push((<option value={i}>{i}</option>));
	}
	return options;
}

interface BoxPositionControllerProps extends Box {
	setBoxPosition: (id: string, position: string, value: string) => void;
	numRows: number;
	numCols: number;
}

const BoxPositionController: React.FC<BoxPositionControllerProps> = ({ setBoxPosition, numRows, numCols, id, name }) => {
	return (
		<div>
			<strong>{`${name}: `}</strong>
			<label htmlFor='col-start-select'>Column start: </label>
			<select name='col-start-select' onChange={e => setBoxPosition(id, 'colStart', e.target.value)}>
				{createPositionOptions(numCols)}
			</select>

			<label htmlFor='col-end-select'>Column end: </label>
			<select name='col-end-select' onChange={e => setBoxPosition(id, 'colEnd', e.target.value)}>
				{createPositionOptions(numCols)}
			</select>

			<label htmlFor='row-start-select'>Row start: </label>
			<select name='row-start-select' onChange={e => setBoxPosition(id, 'rowStart', e.target.value)}>
				{createPositionOptions(numRows)}
			</select>

			<label htmlFor='row-end-select'>Row start: </label>
			<select name='row-end-select' onChange={e => setBoxPosition(id, 'rowEnd', e.target.value)}>
				{createPositionOptions(numRows)}
			</select>
		</div>
	);
}

const BoxControls: React.FC<BoxControlsProps> = (props) => {
	const { addBox, setNewBoxName, newBoxName, implicitRowHeight, isRowHeightImplicit, setIsRowHeightImplicit, setImplicitRowHeight, boxes, numRows, numCols, handleFormSubmit, explicitRowHeights, setExplicitRowHeight, setBoxPosition, checkCSSUnits } = props;

	const [newImplicitHeight, setNewImplicitHeight] = useState<string>(implicitRowHeight);


	const isHeightImplicit = (val: string) => {
		setIsRowHeightImplicit(val === 'implicit');
	}

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (checkCSSUnits(newImplicitHeight.trim())) setImplicitRowHeight(newImplicitHeight.trim());
	}

	return (
		<div>
			<h3>Control boxes</h3>

			<form onSubmit={handleFormSubmit}>
				<label htmlFor="boxname">New box text: </label>
				<input type="text" name="boxname" onChange={(e) => setNewBoxName(e.target.value)} value={newBoxName} />
				<button onClick={addBox} name="addBox" type="submit" value='submit'>Add a box</button>
			</form>

			<h4>Control row/box heights</h4>
			<label htmlFor="row-height">Box/row height method: </label>
			<select name="row-height" onChange={(e) => isHeightImplicit(e.target.value)}>
				<option value="implicit">Implicit</option>
				<option value="explicit">explicit</option>
			</select>
			{
				isRowHeightImplicit ? <span> Set the height of every row at once</span> : <span> Set the height of each row individually</span>
			}
			<br />

			{isRowHeightImplicit ?
				<>
				<form onSubmit={onSubmit}>
					<label htmlFor="implicit-row-height">Implicit row size: </label>
					<input type="text" name="implicit-row-height" onChange={(e) => setNewImplicitHeight(e.target.value)} value={newImplicitHeight} />
					<button type='submit' value='set-implicit-row-height'>Submit</button>
					</form>
				</> : (
					explicitRowHeights.map((rh, i) => <RowHeightsController
						rowHeight={rh}
						index={i}
						setRowHeight={setExplicitRowHeight}
						key={'rh' + i}
						checkCSSUnits={checkCSSUnits}
					/>)
				)
			}


			<br />

			<h4>Control box placement</h4>
			{
				boxes.map(b => 
				<BoxPositionController
					key={'positioncontroller-' + b.id}
					numCols={numCols + 1}
					numRows={numRows + 1}
					setBoxPosition={setBoxPosition}
					{...b}
					/>
					)
			}
			<hr />
		</div>
	);
}

export default BoxControls;

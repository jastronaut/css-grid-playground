import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { BoxContainer, GridContainer } from './styles';
import { Box, Column } from './interfaces';
import BoxControls from './Controls/BoxControls';
import ColumnControls from './Controls/ColumnControls';
import GapControls from './Controls/GapControls';

const basicRE = /^([\d]+(\.)?[\d]?(px|(r)?em|\%|fr))|(auto)|((max|min)-content)$/;

const initBoxes = [
	{
		id: uuid(),
		name: "Box 1",
		colStart: 'auto',
		colEnd: 'auto',
		rowStart: 'auto',
		rowEnd: 'auto'
	},
	{
		id: uuid(),
		name: "Box 2",
		colStart: 'auto',
		colEnd: 'auto',
		rowStart: 'auto',
		rowEnd: 'auto'
	},
];

const createNewBox = (newName: string) => {
	return {
		id: uuid(),
		name: newName,
		colStart: 'auto',
		colEnd: 'auto',
		rowStart: 'auto',
		rowEnd: 'auto'
	}
}


const RenderBox: React.FC<Box> = (props) => {
	return (
		<BoxContainer
			colStart={props.colStart}
			colEnd={props.colEnd}
			rowStart={props.rowStart}
			rowEnd={props.rowEnd}
		>
			{props.name}
		</BoxContainer>
	);
};


const columnReducer = (str: string, curCol: Column) => str + curCol.size + ' ';

const rowHeightsReducer = (str: string, curRow: string) => str + curRow + ' ';

const checkCSSUnits = (str: string) => basicRE.test(str);

/*

interface CodeBlockProps {
	gridTemplateCols: Column[]
}

const CodeBlock: React.SFC<CodeBlockProps> = ({ gridTemplateCols }) => (
	<CodeBlockContainer>
		display: grid;
		<br />
		grid-template-columns: {gridTemplateCols.reduce(columnReducer, '')};
		<br />
	</CodeBlockContainer>
)

*/



const Playground: React.FC<React.ReactNode> = () => {
	const [boxes, setBoxes] = useState<Box[]>(initBoxes);
	const [columns, setColumns] = useState<Column[]>([{
		size: '1fr',
		isRepeating: false
	}]);

	const [rowGap, setRowGap] = useState<string>('0');
	const [colGap, setColGap] = useState<string>('0');


	const [newBoxName, setNewBoxName] = useState<string>('Box 3');

	const [newColSize, setNewColSize] = useState<string>('1fr');

	const [isRowHeightImplicit, setIsRowHeightImplicit] = useState<boolean>(true);

	const [implicitRowHeight, setImplciitRowHeight] = useState<string>('auto');

	const [explicitRowHeights, setExplicitRowHeights] = useState<string[]>(['auto']);

	const [numRows, setNumRows] = useState<number>(1);

	const addBox = () => {
		setBoxes(boxes => boxes.concat([createNewBox(newBoxName)]));
		setNewBoxName('Box ' + (boxes.length + 2));
	}

	const addColumn = () => {
		setColumns(cols => cols.concat([{ size: newColSize, isRepeating: false }]));
	}

	useEffect(() => {
		const res = boxes.length / columns.length;
		if (res < 1)
			setNumRows(1);
		else
			setNumRows(Math.floor(res));
	}, [boxes.length, columns.length]);

	useEffect(() => {
		setExplicitRowHeights(rhs => {

			if (numRows < rhs.length) {
				const rhscpy = rhs;
				rhscpy.pop();
				return rhs;
			}

			if (numRows > rhs.length) {
				const rhscpy = rhs;
				rhscpy.push('auto');
				return rhscpy;
			}
			return rhs;

		});
	}, [numRows]);

	const handleFormSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
	}

	const deleteLastColumn = () => {
		setColumns(columns => columns.slice(0, columns.length - 1));
	}

	const setColSize = (index: number, newSize: string) => {
		setColumns(columns => columns.map((c, i) => {
			if (i === index) {
				c.size = newSize;
			}
			return c;
		}));
	}

	const setExplicitRowHeight = (index: number, newSize: string) => {
		setExplicitRowHeights(rh => rh.map((h, i) => {
			if (i === index) {
				return newSize;
			} return h;
		}));

		console.log(explicitRowHeights);
	}

	const setBoxPosition = (id: string, position: string, value: string) => {
		setBoxes(boxes => boxes.map(b => {
			if (b.id === id)
				return ({
					...b,
					[position]: value
				});
			return b;
		}))
	}

	return (
		<>

			<code>
				display: grid;
				<br />
				grid-template-columns: {columns.reduce(columnReducer, '')};
				<br />
				{isRowHeightImplicit ? `grid-auto-rows: ${implicitRowHeight};` : `grid-template-rows: ${explicitRowHeights};`}
				<br />
				gap: {`${rowGap} ${colGap}`};
			</code>

			<GapControls
				rowGap={rowGap}
				colGap={colGap}
				setRowGap={setRowGap}
				setColGap={setColGap}
			/>

			<BoxControls
				newBoxName={newBoxName}
				setNewBoxName={setNewBoxName}
				addBox={addBox}
				isRowHeightImplicit={isRowHeightImplicit}
				implicitRowHeight={implicitRowHeight}
				setIsRowHeightImplicit={() => setIsRowHeightImplicit(mode => !mode)}
				setImplicitRowHeight={setImplciitRowHeight}
				boxes={boxes}
				numRows={numRows}
				numCols={columns.length}
				handleFormSubmit={handleFormSubmit}
				explicitRowHeights={explicitRowHeights}
				setExplicitRowHeight={setExplicitRowHeight}
				setBoxPosition={setBoxPosition}
				checkCSSUnits={checkCSSUnits}

			/>


			<ColumnControls
				newColSize={newColSize}
				setNewColSize={setNewColSize}
				columns={columns}
				addColumn={addColumn}
				handleFormSubmit={handleFormSubmit}
				deleteLastColumn={deleteLastColumn}
				setColSize={setColSize}
				checkCSSUnits={checkCSSUnits}
			/>
			<GridContainer
				gridTemplateCols={columns.reduce(columnReducer, '')}
				gridAutoRows={implicitRowHeight}
				isRowHeightImplicit={isRowHeightImplicit}
				explicitRowHeights={explicitRowHeights.reduce(rowHeightsReducer, '')}
				rowGap={rowGap}
				colGap={colGap}
			>
				{
					boxes.map(b => <RenderBox key={b.id} {...b} />)
				}
			</GridContainer>

		</>
	);
}

export default Playground;

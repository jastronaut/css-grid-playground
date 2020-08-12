import styled from 'styled-components';

interface GridContainerProps {
	gridTemplateCols: string;
	gridAutoRows: string;
	isRowHeightImplicit: boolean;
	explicitRowHeights: string;
	rowGap: string;
	colGap: string;
}

export const GridContainer = styled.div<GridContainerProps>`
	height: 100%;
	display: grid;
	grid-template-columns: ${props => props.gridTemplateCols};
	${props => props.isRowHeightImplicit ? `grid-auto-rows: ${props.gridAutoRows};` : `grid-template-rows: ${props.explicitRowHeights};`}
	gap: ${props => `${props.rowGap} ${props.colGap}`};
`;

export interface BoxContainerProps {
	colStart: number|string;
	colEnd: number|string;
	rowStart: number|string;
	rowEnd: number|string;
}

export const BoxContainer = styled.div<BoxContainerProps>`
	background-color: white;
	border: 3px solid #d7a87e;
	border-radius: 0.75rem;
	padding: 1rem;
	grid-column-start: ${props => props.colStart};
	grid-column-end: ${props => props.colEnd};
	grid-row-start: ${props => props.rowStart};
	grid-row-end: ${props => props.rowEnd};
	opacity: 0.75;
	transition: 0.25s ease;

	:hover {
		opacity: 1;
		transition: 0.25s ease;
	}
`;

export const CodeBlockContainer = styled.code`
	display: block;
	white-space: pre-wrap;
`;
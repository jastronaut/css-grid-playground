export interface Box {
	id: string;
	name: string;
	colStart: number|string;
	colEnd: number|string;
	rowStart: number|string;
	rowEnd: number|string;
}

export interface Column {
	size: string;
	isRepeating: boolean;
}
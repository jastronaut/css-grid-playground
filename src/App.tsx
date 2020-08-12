import React from 'react';
import { GlobalStyle } from './styles';
import Playground from './Playground';

function App() {
	return (
		<>
			<GlobalStyle />
			<div className="App">
				<header className="App-header">
					Hello
			</header>

        <h1>Grid</h1>
				<main>
					<Playground />
				</main>
			</div>
		</>
	);
}

export default App;

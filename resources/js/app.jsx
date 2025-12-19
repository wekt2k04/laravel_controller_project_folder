import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ color: '#4F46E5', fontSize: '2rem' }}>
                🚀 BRAVO GROUPE CONTROLLER !
            </h1>
            <p>React est bien chargé dans Laravel.</p>
            <p>Le Groupe 3 a réussi sa mission.</p>
        </div>
    );
}

// C'est ICI que la magie opère : React cherche la div "app"
const rootElement = document.getElementById('app');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error("ERREUR CRITIQUE : Impossible de trouver la div id='app' dans le HTML !");
}
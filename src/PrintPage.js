import React from 'react';
import './PrintPage.css'; // Import the CSS file

function PrintPage() {
    function handlePrint() {
        window.print();
    }

    return (
        <div >
            <button onClick={handlePrint} className="print-button" aria-label="Print this page">
                Print
            </button>
        </div>
    );
}


export default PrintPage;

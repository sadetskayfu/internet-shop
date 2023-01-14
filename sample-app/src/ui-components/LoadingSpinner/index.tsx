import React from 'react';
import './style.scss'



const LoadingSpinner: React.FC = () => {
    return (
        <div className='load-spinner-container' >
            <div className='spinner'>
                <div className="blob top"></div>
                <div className="blob bottom"></div>
                <div className="blob left"></div>
                <div className="blob move-blob"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
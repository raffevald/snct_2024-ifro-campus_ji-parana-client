import React from 'react';

import Spinner from './Spinner';

import '../../../styles/components/loadings/LoadingContainer.css';

interface ModalProps {
    isLoading: boolean;
};

const LoadingContainer: React.FC<ModalProps> = ({ 
    isLoading
}) => {
    return (
        <div>
            { isLoading && (
                <div className="loading-component_modal-overlay">
                    <div className="loading-component_modal-content">
                        <Spinner/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoadingContainer;

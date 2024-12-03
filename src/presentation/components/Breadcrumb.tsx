import React from 'react';

import '../../styles/components/Breadcrumb.css';

interface BreadcrumbProps {
    steps: { name: string; link?: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ steps }) => {
    return (
        <nav className="breadcrumbComponent_container">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    {step.link ? (
                        <a href={step.link} className="breadcrumbComponent_link">
                            {step.name}
                        </a>
                    ) : (
                        <span className="breadcrumbComponent_active">{step.name}</span>
                    )}

                    {index < steps.length - 1 && <span className="breadcrumbComponent_separator">/</span>}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default Breadcrumb;

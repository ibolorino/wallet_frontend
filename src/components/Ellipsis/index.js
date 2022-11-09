import React from "react";

import './styles.css';

export default function Ellipsis({children, n_lines=5}) {
    return(
        <div className="ellipsis-general" style={{WebkitLineClamp: n_lines}}>
            {children}
        </div>
    )
}
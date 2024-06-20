import React from 'react';

const SubCategoryNav = ({ subCategories = [], onCategorySelect }) => {
    return (
        <nav className="sub-category-nav">
            <ul className="sub-category-list">
                {subCategories.map(category => (
                    <li key={category.code} className="sub-category-item">
                        <button onClick={() => onCategorySelect(category)}>
                            {category.name}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SubCategoryNav;

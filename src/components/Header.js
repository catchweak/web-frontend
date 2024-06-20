import React, { useState, useEffect } from 'react';

const Header = ({ categories = [], onTopCategorySelect }) => {
    const [selectedTopCategory, setSelectedTopCategory] = useState(null);

    useEffect(() => {
        if (categories.length > 0) {
            const topCategories = categories.filter(category => !category.parentCode);
            if (topCategories.length > 0) {
                setSelectedTopCategory(topCategories[0]);
                onTopCategorySelect(topCategories[0]);
            }
        }
    }, [categories]);

    const handleTopCategoryClick = (category) => {
        setSelectedTopCategory(category);
        onTopCategorySelect(category);
    };

    return (
        <header>
            <div className="logo-container">
                <img src='/img/logo.png' alt="Logo" className="logo-image" />
                <div className="logo-text">CatchWeak</div>
            </div>
            <nav className="nav-menu">
                <ul className="top-category-list">
                    {categories.filter(category => !category.parentCode).map(category => (
                        <li key={category.code} className="top-category-item">
                            <button onClick={() => handleTopCategoryClick(category)}>
                                {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="header-right">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                </div>
                <div className="user-menu">
                    <a href="/login">Login</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
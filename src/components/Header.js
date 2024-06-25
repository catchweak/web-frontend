import React, { useState, useEffect } from 'react';

const Header = ({ topCategories = [], onTopCategorySelect }) => {
    const [topCategory, setTopCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        if (topCategories.length > 0) {
            const initialTopCategory = topCategories.find(category => !category.parentCode);
            if (initialTopCategory) {
                setTopCategory(initialTopCategory);
                setSubCategories([
                    { code: 'all', name: '전체', parentCode: initialTopCategory.code },
                    ...topCategories.filter(category => category.parentCode === initialTopCategory.code)
                ]);
                onTopCategorySelect(initialTopCategory);
            }
        }
    }, [topCategories]);

    const handleTopCategoryClick = (category) => {
        setTopCategory(category);
        setSubCategories([
            { code: 'all', name: '전체', parentCode: category.code },
            ...topCategories.filter(cat => cat.parentCode === category.code)
        ]);
        onTopCategorySelect(category);
    };

    const handleSubCategoryClick = (category) => {
        onTopCategorySelect(category.code === 'all' ? topCategory : category);
    };

    return (
        <>
            <header className="navbar navbar-expand-lg navbar-dark main-bg">
                <div className="container-fluid">
                    <div className="navbar-brand logo-container">
                        <img src='/img/logo.png' alt="Logo" className="logo-image"/>
                        <div className="logo-text">CatchWeak</div>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            {topCategories.filter(category => !category.parentCode).map(category => (
                                <li key={category.code} className="nav-item top-category-item">
                                    <button className="nav-link btn" onClick={() => handleTopCategoryClick(category)}>
                                        {category.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex header-right">
                            <div className="search-bar">
                                <input type="text" className="form-control" placeholder="Search..."/>
                            </div>
                            <div className="user-menu ms-3">
                                <a className="nav-link" href="/login">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {subCategories.map(category => (
                            <li key={category.code} className="nav-item sub-category-item">
                                <button className="nav-link btn" onClick={() => handleSubCategoryClick(category)}>
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default Header;

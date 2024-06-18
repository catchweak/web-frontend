// import React, { useState } from 'react';
// //import logo from '/img/logo.png'; // 로고 이미지 불러오기
//
// const Header = ({ categories, onCategorySelect }) => {
//     const [selectedTopCategory, setSelectedTopCategory] = useState(null);
//
//     const handleTopCategoryClick = (category) => {
//         if (selectedTopCategory && selectedTopCategory.code === category.code) {
//             setSelectedTopCategory(null); // 같은 카테고리를 클릭하면 닫기
//         } else {
//             setSelectedTopCategory(category);
//         }
//     };
//
//     const topCategories = categories.filter(category => !category.parentCode);
//     const subCategories = selectedTopCategory
//         ? categories.filter(category => category.parentCode === selectedTopCategory.code)
//         : [];
//
//     return (
//         <header>
//             <div className="logo-container">
//                 <img src='/img/logo.png' alt="Logo" className="logo-image" /> {/* 로고 이미지 적용 */}
//                 <div className="logo-text">CatchWeak</div>
//             </div>
//             <nav className="nav-menu">
//                 <ul className="top-category-list">
//                     {topCategories.map(category => (
//                         <li key={category.code} className="top-category-item">
//                             <button onClick={() => handleTopCategoryClick(category)}>
//                                 {category.name}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//                 {selectedTopCategory && (
//                     <ul className="sub-category-list">
//                         {subCategories.map(category => (
//                             <li key={category.code} className="sub-category-item">
//                                 <button onClick={() => onCategorySelect(category)}>
//                                     {category.name}
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </nav>
//             <div className="header-right">
//                 <div className="search-bar">
//                     <input type="text" placeholder="Search..." />
//                 </div>
//                 <div className="user-menu">
//                     <a href="/login">Login</a>
//                 </div>
//             </div>
//         </header>
//     );
// };
//
// export default Header;

import React, { useState } from 'react';

const Header = ({ categories = [], onCategorySelect }) => {
    const [selectedTopCategory, setSelectedTopCategory] = useState(null);

    const handleTopCategoryClick = (category) => {
        if (selectedTopCategory && selectedTopCategory.code === category.code) {
            setSelectedTopCategory(null); // 같은 카테고리를 클릭하면 닫기
        } else {
            setSelectedTopCategory(category);
        }
    };

    const topCategories = categories.filter(category => !category.parentCode);
    const subCategories = selectedTopCategory
        ? categories.filter(category => category.parentCode === selectedTopCategory.code)
        : [];

    return (
        <header>
            <div className="logo-container">
                <img src='/img/logo.png' alt="Logo" className="logo-image" /> {/* 로고 이미지 적용 */}
                <div className="logo-text">CatchWeak</div>
            </div>
            <nav className="nav-menu">
                <ul className="top-category-list">
                    {topCategories.map(category => (
                        <li key={category.code} className="top-category-item">
                            <button onClick={() => handleTopCategoryClick(category)}>
                                {category.name}
                            </button>
                        </li>
                    ))}
                </ul>
                {selectedTopCategory && (
                    <ul className="sub-category-list">
                        {subCategories.map(category => (
                            <li key={category.code} className="sub-category-item">
                                <button onClick={() => onCategorySelect(category)}>
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
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

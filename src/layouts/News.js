import { useOutletContext } from "react-router-dom";
import HotTopics from "../components/HotTopics";
import NewsSection from "../components/NewsSection";
import RecommendedNews from "../components/RecommendedNews";
import PopularNews from "../components/PopularNews";
import HotShorts from "../components/HotShorts";
import Events from "../components/Events";

const News = () => {
  // ****************     init values      **************** //
  const { currentCategory } = useOutletContext();

  // ****************     UI      **************** //
  return (
    <div className="content-container">
      <div className="section">
        <PopularNews />
      </div>
      <div className="section">
        <HotShorts />
      </div>
      <div className="section">
        <HotTopics />
      </div>
      <div className="section">
        {currentCategory && (
          <NewsSection
            key={currentCategory.code}
            title={currentCategory.name}
            selectedCategory={currentCategory}
          />
        )}
      </div>
      <div className="section">
        <RecommendedNews news={[]} />
      </div>
      <div className="section">
        <Events />
      </div>
    </div>
  );
};

export default News;

import React from "react";
import { Carousel } from "react-bootstrap";
import VideoPlayer from "../components/VideoPlayer";
import "bootstrap/dist/css/bootstrap.min.css";

const HotShorts = () => {
  const titles = Array(5).fill("*");

  return (
    <div
      className="hot-videos"
      style={{
        maxWidth: "100%"
      }}
    >
      <h2>인기 쇼츠</h2>
      <div class="headline-banner">
        <Carousel controls={false} indicators={false} interval={null}>
          <Carousel.Item>
            <div className="d-flex" style={{ padding: "10px" }}>
              {titles.map((title, index) => (
                <div key={index} style={{ margin: "10px" }}>
                  <VideoPlayer title={"*"} rank={index + 1} />
                </div>
              ))}
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default HotShorts;

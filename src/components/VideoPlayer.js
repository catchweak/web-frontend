import React, { useState, useEffect } from "react";
import axiosClient from "@src/utils/axiosHelper";

const VideoPlayer = ({ title }) => {
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        title = "김예지";
        const response = await axiosClient.get(`/api/videos/search/${title}`, {
          responseType: "blob"
        });

        const videoUrl = URL.createObjectURL(response.data);
        setVideoSrc(videoUrl);
      } catch (error) {
        console.error("Error fetching the video:", error);
      }
    };

    fetchVideo();
  }, [title]);

  return (
    <div>
      {videoSrc ? (
        <video controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoPlayer;

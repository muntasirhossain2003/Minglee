import React, { useRef, useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { IoChevronBackCircle, IoChevronForwardCircle } from "react-icons/io5";
import logo from "../assets/icon.png";
import StoryDp from "./StoryDp";
import Nav from "./Nav";
import Post from "./Post";
import { useSelector } from 'react-redux';

const Feed = () => {
  const { postData } = useSelector((state) => state.post);
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  // Check if scroll buttons should be visible
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto">
      {/* logo and notification icon */}
      <div className="w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden">
        <img src={logo} alt="logo" className="w-[80px]" />
        <div>
          <FaRegHeart className="text-[white] w-[25px] h-[25px]" />
        </div>
      </div>

      {/* story content with scroll buttons */}
      <div className="relative group px-[20px] py-[20px]">
        {/* Left scroll button */}
        {showLeftButton && (
          <button
            onClick={() => scroll("left")}
            className="hidden lg:flex absolute left-[25px] top-1/2 -translate-y-1/2 z-10 w-[36px] h-[36px] items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-200 hover:opacity-100"
            aria-label="Scroll left"
          >
            <IoChevronBackCircle className="text-white w-full h-full drop-shadow-lg" />
          </button>
        )}

        {/* Stories container */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="flex w-full overflow-x-auto gap-[10px] items-center"
        >
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asifAhmed12" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
          <StoryDp userName="asif" />
        </div>

        {/* Right scroll button */}
        {showRightButton && (
          <button
            onClick={() => scroll("right")}
            className="hidden lg:flex absolute right-[25px] top-1/2 -translate-y-1/2 z-10 w-[36px] h-[36px] items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-200 hover:opacity-100"
            aria-label="Scroll right"
          >
            <IoChevronForwardCircle className="text-white w-full h-full drop-shadow-lg" />
          </button>
        )}
      </div>

      {/* feed content */}
      <div className="w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]">
        <Nav />
        {postData?.map((post, index) => (<Post key={index} post={post} />))}
      </div>
    </div>
  );
};

export default Feed;

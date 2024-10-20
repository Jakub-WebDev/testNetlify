import Slider from "../components/Slider";
import Featured from "../components/Featured";
import Latest from "../components/Latest";
import Chair from "../components/Chair";
import Trending from "../components/Trending";
import TopCategories from "../components/TopCategories";
import Subscribe from "../components/Subscribe";
import Blog from "../components/Blog";
import Discount from "../components/Discount";

export default function Home() {
  return (
    <>
      <Slider />
      <Featured />
      <Latest />
      <Chair />
      <Trending />
      <Discount />
      <TopCategories />
      <Subscribe />
      <Blog />
    </>
  );
}

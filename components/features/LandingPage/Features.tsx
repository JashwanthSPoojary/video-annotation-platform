import FeatureFirst from "./feature/FeatureFirst";
import FeatureSecond from "./feature/FeatureSecond";
import FeatureThird from "./feature/FeatureThird";

const Features = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-[270px]">
      <FeatureFirst/>
      <FeatureSecond/>
      <FeatureThird/>
    </div>
  )
}

export default Features;
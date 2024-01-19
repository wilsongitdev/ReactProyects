import ReactIcons from "../assets/ReactIcons"
import ReactIconsParent from "../assets/ReactIconsParent"
import imgLoading from "../assets/200w.gif";
import { useState } from "react";

const Card = ({name, abilities, personalData, id}) => {
  const [loadingImg, setLoadingImg] = useState(true);

  const isLoadedImage = () => {
    setLoadingImg(false);
  }
  return (
      <div className="bg-red-100 rounded-md flex flex-col flex-wrap shadow-md">
        {/* <ReactIconsParent>
          <ReactIcons color="#FF00F0" width="100" height="100"/>
        </ReactIconsParent> */}
        <img 
          src={loadingImg?imgLoading:personalData[0].sprites.front_default } 
          alt={loadingImg?`img-loading-${id}`:personalData[0].name} 
          className="m-auto"
          onLoad={isLoadedImage}
        />
        <h3>{name}</h3>
        <h6 className="underline">Abilities</h6>
        <ul className="list-disc mx-auto">
          {abilities.map((ability, id) => (
            <li key={id}>
            {ability.ability.name}
            </li>
          ))}
          
        </ul>
      </div>
  )
}

export default Card

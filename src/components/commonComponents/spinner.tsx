import React from "react"
import { squircle, mirage} from "ldrs"

//Types
import { LoadedProps } from "../../types/common/commonTypes"


export const MirageLoader: React.FC<LoadedProps> = ({size}) => {
  mirage.register()
      return (
        <l-mirage
          size={size}
          speed="2.5" 
          color="white" 
        ></l-mirage>
      )
  }


  export const SquircleLoader: React.FC<LoadedProps> = ({size}) => {
  squircle.register()
        return (
        <l-squircle
          size={size}
          stroke="3"
          stroke-length="0.4"
          bg-opacity="0.1"
          speed="1.1" 
          color="white" 
        ></l-squircle>

    )
  }





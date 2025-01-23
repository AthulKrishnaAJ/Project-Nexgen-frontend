import React from "react"
import { squircle, mirage} from "ldrs"

//Types
import { LoadedProps } from "../../types/common/commonTypes"


export const Loader: React.FC<LoadedProps> = ({size}) => {
  mirage.register()
      return (
        <l-mirage
          size={size}
          speed="2.5" 
          color="white" 
        ></l-mirage>
      )
  }






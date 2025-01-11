import React from "react"
import { squircle } from "ldrs"

//Types
import { LoadedProps } from "../../types/common/commonTypes"


export const Loader: React.FC<LoadedProps> = ({size}) => {
    squircle.register()
      return (
        <l-squircle
        size={size}
        stroke={3}
        stroke-length={0.15}
        bg-opacity={0.1}
        speed={0.9}
        color='white'
        />
      )
  }
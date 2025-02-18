import React from 'react'
import { Link } from 'react-router-dom'

//Styles and icons
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'

//Types and interfaces
import { DropDownProps } from '@/types/common/commonTypes'

const DropDownMenu: React.FC<DropDownProps> = ({
    menuLabel, 
    menuNavigations,
    menuExicutors,
    triggerElement
}) => {
    

  return (
    <DropdownMenu>
    <DropdownMenuTrigger asChild>
        {triggerElement}
    </DropdownMenuTrigger>
    <DropdownMenuContent 
    className="w-56 z-[60]"
    sideOffset={23}
    align='start'
    >
      <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        {menuNavigations.map((item, index) => (
            <Link to={item.link} key={index}>
                <DropdownMenuItem>
                    {item.label}
                </DropdownMenuItem>
            </Link>
        ))}
 
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      {menuExicutors.map((item, index) => {
        return (
            <DropdownMenuItem 
            key={index} 
            onClick={() => item.exicutor()}>
            <span>{item.label}</span>
            {item.icon}
          </DropdownMenuItem>
        )
      })}
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default DropDownMenu

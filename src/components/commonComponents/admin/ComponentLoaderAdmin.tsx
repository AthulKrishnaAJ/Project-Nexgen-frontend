import { ring2 } from 'ldrs'



const ComponentLoaderAdmin: React.FC = () => {

    ring2.register()
    return (
        <l-ring-2
        size="35"
        stroke="3"
        stroke-length="0.30"
        bg-opacity="0.1"
        speed="0.8" 
        color="black" 
        ></l-ring-2>
    )
    
}

export default ComponentLoaderAdmin



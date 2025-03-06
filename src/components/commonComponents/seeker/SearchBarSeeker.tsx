import React, { useEffect, useState } from 'react'

//Types and interface
import { SearchBarProps } from '@/types/seeker/seekerInterfaces'

//Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Search, MapPin } from 'lucide-react'

const SearchBarSeeker: React.FC<SearchBarProps> = ({ onSearch, title }) => {
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [activeTab, setActiveTab] = useState<string>(title)

    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch(searchTerm, activeTab)
        }, 300)

        return () => clearTimeout(timer)
    }, [searchTerm, activeTab, onSearch])


    const handleTabChange = (value: string) => {
        setActiveTab(value as string)
        setSearchTerm('')
    }

    return (
        <div className="bg-white shadow-md rounded-xl p-2 w-1/2">
            <Tabs defaultValue={title} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-2">
                    <TabsTrigger value={title} className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        <span>Search by {title} title</span>
                    </TabsTrigger>
                    <TabsTrigger value="location" className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>Search by location</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value={title} className='mt-0'>
                    <div className='relative'>
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <Input
                            type="text"
                            placeholder={`Search for ${title} title or keywords`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 py-6 text-base"
                        />
                    </div>
                </TabsContent>

                <TabsContent value='location' className='mt-0'>
                    <div className='relative'>
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                        type="text" 
                        placeholder='Enter state or district...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 py-6 text-base"
                        />
                    </div>
                </TabsContent>

            </Tabs>

        </div>
    )
}

export default SearchBarSeeker

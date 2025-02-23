import { formatDistanceToNow } from 'date-fns';

export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}


export const calculateTimeAgo = (dateString: string) => {
    const timeDifference = formatDistanceToNow(new Date(dateString), {addSuffix: false})
    
    if(timeDifference.includes('minute')) return timeDifference.split(' ')[0] + 'min'
    if(timeDifference.includes('day')) return timeDifference.split(' ')[0] + 'd'
    if(timeDifference.includes('hour')) return timeDifference.split(' ')[1] + 'h'
    if(timeDifference.includes('month')) return timeDifference.split(' ')[0] + 'm'
    if(timeDifference.includes('year')) return timeDifference.split(' ')[0] + 'y'
   
}
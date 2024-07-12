type Heading = {
    content: string
}

export const Heading = ({content}: Heading) => {
    return(
        <div className="font-extrabold text-4xl mb-2 font-sans">
           {content} 
        </div>
    )
}
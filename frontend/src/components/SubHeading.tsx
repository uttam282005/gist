interface SubHeading {
    content: string
}

export const SubHeading = ({content}: SubHeading) => {
    return(
        <div className="text-slate-400 mb-4 text-md">
            {content}
        </div>
    )
}
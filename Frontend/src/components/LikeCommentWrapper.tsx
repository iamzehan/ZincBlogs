export default function LikeCommentWrapper ({children}: {children: React.ReactNode}){
    
    return (
        <div className="w-full rounded-lg flex items-center gap-2 *:flex-1">
            {children}
        </div>
    )
}
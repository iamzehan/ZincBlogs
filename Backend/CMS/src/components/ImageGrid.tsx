export default function Grid ({children}: {children: React.ReactNode}){
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 w-screen px-2">
            {children}
        </div>
    );
}
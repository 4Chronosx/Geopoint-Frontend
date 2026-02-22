

export default function SearchBar() {
    return (
        <>
        <div className="min-h-10 w-full max-w-96 p-2 border rounded-2xl flex flex-row justify-around">
            <input type="text" className="w-3/4 outline-none"/>
            <button className="">Search</button>
        </div>
        </>
    )
}
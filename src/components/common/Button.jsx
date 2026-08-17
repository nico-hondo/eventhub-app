export function Button({isValue}){
    return(
        <button className="absolute inset-y-1 right-2 text-gray-100 text-sm w-20 h-8 rounded-lg bg-orange-600 cursor-pointer capitalize">{isValue}</button>
    )
}
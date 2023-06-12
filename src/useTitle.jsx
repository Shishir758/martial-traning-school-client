import { useEffect } from "react"

const useTitle = title =>{
    useEffect(()=>{
        document.title = `Taeknowdo | ${title}`;
    }, [title])
}
export default useTitle;
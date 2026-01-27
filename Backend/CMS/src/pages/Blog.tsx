import { useParams } from "react-router-dom"
export default function Page() {
    const {id} = useParams();
    return <p>I am the blog page, I am showing blog {id}</p>
}
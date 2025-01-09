import { useParams } from "react-router-dom"

export default function Profile() {
    const params = useParams();
  return (
    <div>Profile : {params.name}</div>
  )
}

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { userIsAuthenticatedFake } from "../../services/auth";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    userIsAuthenticatedFake() ?
      navigate('/home') :
      navigate('/login')
  })

  return (
    <></>
  )
}
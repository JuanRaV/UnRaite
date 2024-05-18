import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useRaites from "../hooks/useRaites"
import RaiteForm from "../components/RaiteForm"

const EditRaite = () => {
    const { raite, getRaite, loading } = useRaites()

    const { id } = useParams()

    useEffect(() => {
        getRaite(id)
    }, [])

    if (loading) return 'Loading...'
    console.log(raite)

    return (
        <>

            <h1 className='text-4xl font-black'>Edit Raite</h1>
            <div className="mt-10 flex justify-center">
                <RaiteForm />
            </div>

        </>
    )
}

export default EditRaite
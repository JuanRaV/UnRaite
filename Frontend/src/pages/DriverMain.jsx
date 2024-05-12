import useRaites from "../hooks/useRaites"
import Alert from "../components/Alert"

const DriverMain = () => {
    // const { raites, alert } = useRaites()
    const raites = useRaites()
    console.log(raites)
    // console.log(raites)
    const { msg } = alert

    return (
        <>
            <h1 className="text-4xl font-black">Raites</h1>
        </>
    )
}

export default DriverMain
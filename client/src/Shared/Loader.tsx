import { PropagateLoader } from 'react-spinners'

export default function Loader() {
    return (
        <div className="h-screen flex justify-center items-center">
            <PropagateLoader
                color="#fda4af" size={30} />
        </div>
    )
}

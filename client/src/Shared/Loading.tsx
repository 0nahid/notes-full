import { PropagateLoader } from 'react-spinners'

export default function Loading() {
    return (
        <div className="h-screen flex justify-center items-center">
            <PropagateLoader
                color="#d946ef" size={30} />
        </div>
    )
}

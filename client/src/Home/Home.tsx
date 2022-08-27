import Notes from './Notes/Notes';
import Upload from './Upload/Upload';

export default function Home() {
    return (
        <div>
            {/* Upload box */}
            <Upload />
            <Notes />
        </div>
    )
}

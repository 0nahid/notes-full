import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Masonry from "react-masonry-css";
import Loading from "../../Shared/Loading";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1
};

export default function Notes() {
  const { data: notes, isLoading, refetch } = useQuery(['notes'], () => axios(`http://localhost:5000/api/notes`))
  refetch();
  // console.log(notes);

  if (isLoading) {
    <Loading />
  }
  return (
    <div className="container  mx-auto">
      <h1 className="text-center font-bold">You've {notes?.data?.length} {notes?.data?.length > 1 ? "Notes" : "Note"}  </h1>
      {/* Notes  */}
      <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointColumnsObj}>
        {
          notes?.data?.map((note: any) => (
            <div className="card p-3 m-3 bg-base-100 shadow-xl w-100">
              <div className="card-body">
                <h5 className="font-bold uppercase"> {note?.title ? note.title.slice(0, 15) : 'N/A'} {note?.title.length > 15 ? '...' : ''} </h5>
                <p>{note?.note.slice(0, 300)} {note?.note.length > 200 ? '...' : ''} </p>
              </div>
              <div className="m-3 p-3 ">
                <button className="btn btn-sm">U</button>
                <button className="btn btn-sm">D</button>
                <button className="btn btn-sm">S</button>
              </div>
              <small>{note?.note.length} charecters</small>
            </div>
          ))
        }
      </Masonry>
    </div>
  )
}

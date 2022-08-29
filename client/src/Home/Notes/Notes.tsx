import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaShare } from "react-icons/fa";
import { MdDeleteSweep, MdSendAndArchive } from "react-icons/md";
import Masonry from "react-masonry-css";
import Loading from "../../Shared/Loading";
import './notes.css';
const breakpointColumnsObj = {
  default: 5,
  1100: 3,
  700: 2,
  500: 1
};

export default function Notes() {
  const { data: notes, isLoading, refetch } = useQuery(['notes'], () => axios(`http://localhost:5000/api/notes`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('aceessToken')} `
    }
  }))
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
          notes?.data?.map((note: any, index: number) => (
            <div className="card p-3 m-3 bg-base-100 shadow-xl w-100 note-hover" key={index} >
              <div className="card-body">
                <h5 className="font-bold uppercase"> {note?.title ? note?.title?.slice(0, 15) : 'N/A'} {note?.title.length > 15 ? '...' : ''} </h5>
                <p>{note?.note?.slice(0, 300)} {note?.note?.length > 200 ? '...' : ''} </p>
              </div>
              <div className="m-3 p-3 note-items ">
                <div className=" flex justify-start items-center text-xl font-light">
                  <MdSendAndArchive className="hover:cursor-pointer mr-1" />
                  <MdDeleteSweep className="hover:cursor-pointer mr-1 " />
                  <FaShare className="hover:cursor-pointer" />
                </div>
              </div>
              <small>{note?.note?.length > 0 ? note?.note?.length : '0'} {note?.note?.length > 1 ? 'charecters' : 'charecter'} </small>
            </div>
          ))
        }
      </Masonry>
    </div>
  )
}

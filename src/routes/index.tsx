import { useReads } from "../context/ReadsProvider";
import { Link } from "react-router-dom";

export default function Index() {
  const { reads } = useReads();
  return (
    <p id="zero-state">
      <h4 className="text-3xl font-bold mb-8 font-sans">Minhas leituras:</h4>
      <div className="flex flex-wrap gap-8 box-border">
        {reads?.map((read, i) => (
          <Link
            key={i}
            to={`reads/${read.id}`}
            className="block w-40 aspect-book rounded-lg shadow-lg hover:brightness-105 hover:scale-105 transition-all duration-150"
          >
            <img className="h-full" key={i} src={read.cover} alt={read.title} />
          </Link>
        ))}
      </div>
    </p>
  );
}

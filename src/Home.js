import { useEffect, useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { showAllClasses } from './operations/attendenceApi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-hot-toast";
import { addStudent } from "./operations/attendenceApi";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const email = user.email;

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = { email: email };
        const response = await dispatch(showAllClasses(data));
        setClasses(response.data.classes);
      } catch (error) {
        toast.error('Can not load classes');
      }
    };

    fetchData();
  }, [dispatch, email]);

  return (
    <div className="h-[calc(100vh-48px)] bg-gray-900 text-white">
      <div className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {classes.map((element, key) => (
            <Link to={`/Menu/${element._id}`} key={key} className="bg-green-500 hover:bg-green-600 transition-colors rounded-lg shadow-lg p-4">
              <div>
                <p className="text-lg font-semibold">{`Class: ${element.standard}`}</p>
                <p>{`Time: ${element.startTime} to ${element.endTime}`}</p>
                <p>{`Subject: ${element.subject}`}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Link to="/addclass">
        <div className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 transition-colors rounded-full p-4 shadow-lg">
          <AiFillPlusCircle className="text-6xl text-white" />
        </div>
      </Link>
    </div>
  );
};

export default Home;

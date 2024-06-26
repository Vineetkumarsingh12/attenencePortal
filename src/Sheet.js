import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSingleClass, markAttendance } from "./operations/attendenceApi";
import { useParams, useNavigate } from "react-router-dom";

const Sheet = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const { register, handleSubmit, setValue } = useForm();
  const [allPresent, setAllPresent] = useState(false);
  const navigate = useNavigate();

  const date = new Date(); 
  const optionsD = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Kolkata',
    hour12: false,
  };
  const optionsT = { 
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }
  const indianDate = date.toLocaleDateString('en-IN', optionsD);
  const indianTime = date.toLocaleTimeString('en-IN', optionsT);

  useEffect(() => {
    const fetchData = async () => {
      const data = { id: id };
      const response = await dispatch(showSingleClass(data));
      setStudents(response.data.data);
    };
    fetchData();
  }, [id, dispatch]);

  const handleCheckboxChange = (studentId, isChecked) => {
    setValue(studentId, isChecked);
  };

  const handlePresentAllClick = () => {
    setAllPresent(!allPresent);
    students.forEach((student) => {
      setValue(student._id, allPresent);
    });
  };

  const onSubmit = (data) => {
    const attendance = [];
    for (const [key, value] of Object.entries(data)) {
      attendance.push({ id: key, mark: value ? 'P' : 'A', Date: indianDate, classId: id, time: indianTime });
    }
    console.log("attendance", attendance);
    dispatch(markAttendance({ attendence: attendance }, navigate));
  };

  return (
    <div className="m-1 bg-gray-800 min-h-[calc(100vh-4rem)] p-4 overflow-hidden">
      <div className="bg-gray-900 text-center rounded-lg p-6 shadow-lg overflow-hidden">
        <h2 className="text-white text-2xl mb-4">List of Students</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-700 rounded-lg">
              <thead>
                <tr>
                  <th className="border-b border-gray-600 px-4 py-2 text-white">S.R No</th>
                  <th className="border-b border-gray-600 px-4 py-2 text-white">Name</th>
                  <th className="border-b border-gray-600 px-4 py-2 text-white">Roll No</th>
                  <th className="border-b border-gray-600 px-4 py-2 text-white">Email</th>
                  <th className="border-b border-gray-600 px-4 py-2 text-white">Phone</th>
                  <th className="border-b border-gray-600 px-4 py-2 text-white">Address</th>
                  <th className="border-b border-gray-600 px-4 py-2 text-white">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="border-b border-gray-600 px-4 py-2 text-white">{index + 1}</td>
                    <td className="border-b border-gray-600 px-4 py-2 text-white">{student.name}</td>
                    <td className="border-b border-gray-600 px-4 py-2 text-white">{student.rollNo}</td>
                    <td className="border-b border-gray-600 px-4 py-2 text-white">{student.email}</td>
                    <td className="border-b border-gray-600 px-4 py-2 text-white">{student.phone}</td>
                    <td className="border-b border-gray-600 px-4 py-2 text-white">{student.address}</td>
                    <td className="border-b border-gray-600 px-4 py-2 text-white">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-green-600"
                        {...register(`${student._id}`)}
                        onChange={(e) => handleCheckboxChange(student._id, e.target.checked)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <button className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition-colors" type="submit">
              Submit
            </button>
            <button
              type="button"
              className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition-colors"
              onClick={handlePresentAllClick}
            >
              {allPresent ? "Unmark All" : "Mark All Present"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sheet;

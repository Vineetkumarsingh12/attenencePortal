import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addStudent } from "./operations/attendenceApi";

const AddStudent = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAdd = (data) => {
    setStudents((prevStudents) => [...prevStudents, data]);
    console.log(students);
    reset();
  };

  const handleClick = () => {
    const data = { students: students, id: id };
    console.log(data);
    dispatch(addStudent(data, navigate));
  };

  return (
    <div className="flex flex-col gap-5 min-h-[calc(100vh-3rem)] bg-gray-900 p-6 overflow-hidden">
      <h1 className="text-3xl text-white text-center mb-6">Add Student</h1>

      {/* Form */}
      <div className="bg-gray-800 p-6 rounded-lg mx-auto w-full max-w-4xl">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onAdd)}>
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", { required: true })}
            />
            <input
              type="text"
              name="rollNo"
              placeholder="Roll No"
              className={`flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.rollNo ? "focus:ring-red-500" : "focus:ring-blue-500"}`}
              {...register("rollNo", { required: 'Roll No is required' })}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("email", { required: true })}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("phone", { required: true })}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="flex-grow p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("address", { required: true })}
            />
          </div>
          <button className="mt-4 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors" type="submit">
            Add Student
          </button>
        </form>
      </div>

      {/* List of Students */}
      <div className="bg-gray-800 p-6 rounded-lg mx-auto w-full max-w-4xl mt-6">
        <h2 className="text-2xl text-white mb-4">List of Students</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-lg">
            <thead>
              <tr>
                <th className="border-b border-gray-600 px-4 py-2 text-white">Name</th>
                <th className="border-b border-gray-600 px-4 py-2 text-white">Roll No</th>
                <th className="border-b border-gray-600 px-4 py-2 text-white">Email</th>
                <th className="border-b border-gray-600 px-4 py-2 text-white">Phone</th>
                <th className="border-b border-gray-600 px-4 py-2 text-white">Address</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-600 px-4 py-2 text-white">{student.name}</td>
                  <td className="border-b border-gray-600 px-4 py-2 text-white">{student.rollNo}</td>
                  <td className="border-b border-gray-600 px-4 py-2 text-white">{student.email}</td>
                  <td className="border-b border-gray-600 px-4 py-2 text-white">{student.phone}</td>
                  <td className="border-b border-gray-600 px-4 py-2 text-white">{student.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="mt-4 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors" onClick={handleClick}>
          Submit Students
        </button>
      </div>
    </div>
  );
};

export default AddStudent;

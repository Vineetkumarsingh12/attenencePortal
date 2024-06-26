import React from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createClass } from './operations/attendenceApi';

const CreateClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { register, handleSubmit, reset } = useForm();

  const email = user.email;
  console.log(email);

  const onSubmit = (data) => {
    data = { ...data, email: email };
    console.log(data); // Log the form data
    dispatch(createClass(data, navigate));
    reset();
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-48px)] bg-gray-900">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-center rounded-2xl p-10">
        <h1 className="text-white text-3xl mb-6 font-bold">Create a New Class</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-white text-lg mb-2">Class Standard <span className="text-red-700">*</span></label>
            <input
              type="text"
              name="standard"
              placeholder="Enter class standard"
              className="rounded-lg w-full p-3 text-gray-900"
              {...register("standard", { required: true })}
            />
          </div>
          <div>
            <label className="block text-white text-lg mb-2">Class Timing <span className="text-red-700">*</span></label>
            <div className="flex gap-4">
              <input
                type="text"
                name="startTime"
                placeholder="Start time (e.g., 10:00)"
                className="rounded-lg w-1/2 p-3 text-gray-900"
                {...register("startTime", { required: true })}
              />
              <input
                type="text"
                name="endTime"
                placeholder="End time (e.g., 11:00)"
                className="rounded-lg w-1/2 p-3 text-gray-900"
                {...register("endTime", { required: true })}
              />
            </div>
          </div>
          <div>
            <label className="block text-white text-lg mb-2">Subject <span className="text-red-700">*</span></label>
            <input
              type="text"
              name="subject"
              placeholder="Enter subject"
              className="rounded-lg w-full p-3 text-gray-900"
              {...register("subject", { required: true })}
            />
          </div>
          <button className="bg-gradient-to-r from-white to-gray-200 text-blue-500 rounded-lg p-3 w-full mt-4 hover:from-gray-100 hover:to-gray-300 transition-colors font-semibold" type="submit">
            Create Class
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateClass;

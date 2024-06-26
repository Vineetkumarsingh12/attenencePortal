import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { showSingleStudent, updateStudentDetails } from "./operations/attendenceApi";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const EditDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm();

  function setInputFields(data) {
    setValue("name", data.name);
    setValue("rollNo", data.rollNo);
    setValue("email", data.email);
    setValue("phone", data.phone);
    setValue("address", data.address);
  }

  useEffect(() => {
    const fetch = async () => {
      console.log("id=====", id);
      const response = await dispatch(showSingleStudent({ id: id }));
      console.log(response.data);

      setInputFields(response.data);
    };
    fetch();
  }, [id, dispatch]);

  const submitData = async (data, navigate) => {
    console.log(data);
    data.id = id;
    dispatch(updateStudentDetails(data, navigate));
  };

  return (
    <div className="h-[calc(100vh-48px)] pt-8 w-full bg-black overflow-hidden">
      <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-center text-blue-400 mb-6">Edit Student Details</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitData)}>
          <input
            className="border border-gray-700 px-4 py-2 bg-gray-800 text-white rounded-md"
            type="text"
            placeholder="Name"
            {...register("name")}
            onChange={(e) => setValue("name", e.target.value)}
          />
          <input
            className="border border-gray-700 px-4 py-2 bg-gray-800 text-white rounded-md"
            type="text"
            placeholder="Roll No"
            {...register("rollNo")}
            onChange={(e) => setValue("rollNo", e.target.value)}
          />
          <input
            className="border border-gray-700 px-4 py-2 bg-gray-800 text-white rounded-md"
            type="text"
            placeholder="Email"
            {...register("email")}
            onChange={(e) => setValue("email", e.target.value)}
          />
          <input
            className="border border-gray-700 px-4 py-2 bg-gray-800 text-white rounded-md"
            type="text"
            placeholder="Phone"
            {...register("phone")}
            onChange={(e) => setValue("phone", e.target.value)}
          />
          <input
            className="border border-gray-700 px-4 py-2 bg-gray-800 text-white rounded-md"
            type="text"
            placeholder="Address"
            {...register("address")}
            onChange={(e) => setValue("address", e.target.value)}
          />
          <button className="border border-gray-700 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditDetailsPage;

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { GrFormView } from "react-icons/gr";
import { PiEyeClosedLight } from "react-icons/pi";
const UserForm = ({
  inputData,
  submit,
  errors,
  handleConfirmPassword,
  handleInput,
  handlePassword,
  handlePicture,
  showPassword,
  showConfirmPassword,
  checkedRef,
  isloading,
}) => {
  return (
    <>
      <form className="py-4 text-black  md:w-[50%] w-full px-8">
        <h1 className="py-4 text- text-center text-4xl font-bold">Sign Up</h1>
        <div className="flex bg-none w-full border rounded-md px-4 items-center  focus:ring-2 focus:ring-cyan-900">
          <input
            type="text"
            placeholder="firstname"
            required
            name="firstname"
            value={inputData?.firstname}
            onChange={handleInput}
            className="bg-transparent w-full p-3 outline-none placeholder::text-[##D51C75]"
            aria-required={true}
          />
          <FaUser className="icon" />
        </div>
        {errors.firstname && <p className="text-red-600">{errors.firstname}</p>}
        <div className="flex bg-none w-full border rounded-md px-4 items-center mt-2 focus:ring-2 focus:ring-cyan-900">
          <input
            type="text"
            placeholder="lastname"
            required
            className="bg-transparent w-full p-3 outline-none "
            name="lastname"
            value={inputData?.lastname}
            onChange={handleInput}
            aria-required={true}
          />
          <FaUser className="icon" />
        </div>
        {errors.lastname && <p className="text-red-600">{errors.lastname}</p>}

        <div className="flex bg-none w-full border rounded-md px-4 items-center mt-2 focus:ring-2 focus:ring-cyan-900">
          <input
            type="text"
            placeholder="Username"
            autoComplete="username"
            required
            name="username"
            value={inputData?.username}
            onChange={handleInput}
            aria-required={true}
            className="bg-transparent w-full p-3 outline-none "
          />
          <FaUser className="icon" />
        </div>
        {errors.username && <p className="text-red-600">{errors.username}</p>}

        <div className="flex bg-none w-full border rounded-md px-4 items-center mt-2 focus:ring-2 focus:ring-cyan-900">
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={inputData?.email}
            onChange={handleInput}
            aria-required={true}
            className="bg-transparent w-full p-3 outline-none "
          />
          <FaEnvelope className="icon" />
        </div>
        {errors.email && <p className="text-red-600">{errors.email}</p>}

        <div className="flex bg-none w-full border rounded-md px-4 items-center mt-2 focus:ring-2 focus:ring-cyan-900">
          <input
            type={`${!showPassword ? "password" : "text"}`}
            placeholder="Passsword"
            required
            name="password"
            aria-required={true}
            className="bg-transparent w-full p-3 outline-none "
            value={inputData?.password}
            onChange={handleInput}
          />
          {!showPassword ? (
            <PiEyeClosedLight
              className="icon text-2xl cursor-pointer"
              onClick={handlePassword}
            />
          ) : (
            <GrFormView className="text-2xl cursor-pointer" onClick={handlePassword} />
          )}
        </div>
        {errors.password && <p className="text-red-600">{errors.password}</p>}

        <div className="flex bg-none w-full border rounded-md px-4 mt-2 items-center  focus:ring-2 focus:ring-cyan-900">
          <input
            type={`${!showConfirmPassword ? "password" : "text"}`}
            placeholder="confirmPasssword"
            required
            name="confirmPassword"
            aria-required={true}
            value={inputData?.confirmPassword}
            onChange={handleInput}
            className="bg-transparent w-full p-3 outline-none "
          />
          {!showConfirmPassword ? (
            <PiEyeClosedLight
              className="text-2xl cursor-pointer"
              onClick={handleConfirmPassword}
            />
          ) : (
            <GrFormView className="text-2xl cursor-pointer" onClick={handleConfirmPassword} />
          )}
        </div>
        {errors.confirmPassword && (
          <p className="text-red-600">{errors.confirmPassword}</p>
        )}

        <div className="flex bg-none w-full border rounded-md px-4 mt-2 items-center  focus:ring-2 focus:ring-cyan-900">
          <input
            type="file"
            name="profilePicture"
            aria-required={true}
            className="bg-transparent w-full p-3 outline-none "
            onChange={handlePicture}
          />
        </div>
        {errors.profilePicture && (
          <p className="text-red-600">{errors.profilePicture}</p>
        )}

        <div className="py-4 flex items-center">
          <input type="checkbox" ref={checkedRef} />
          <label className="ml-2">I agree to terms & conditions</label>
        </div>

        <button
          onClick={submit}
          role="button"
          className="border-none w-full hover:bg-slate-500 p-3 text-white rounded-md bg-[#102262] focus:ring-2 focus:ring-cyan-900">
          {isloading ? "Processing" : "Signup"}
        </button>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <span className="text-[#D51C75]">
            <Link to={"/login"}>Login </Link>
          </span>
        </p>
      </form>
    </>
  );
};

export default UserForm;

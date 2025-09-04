import { useState } from "react";
import { motion } from "framer-motion";
import photo from '../../images/optical-photo.jpg';
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.5 } },
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard')

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Illustration */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-indigo-500 to-purple-500 items-center justify-center p-6">
          <motion.img
            src={photo}
            alt="Auth Illustration"
            className="rounded-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8">
          {/* Tabs */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 font-semibold ${
                isLogin ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 font-semibold ${
                !isLogin ? "border-b-2 border-indigo-500 text-indigo-600" : "text-gray-500"
              }`}
            >
              Register
            </button>
          </div>

          <motion.div
            key={isLogin ? "login" : "register"}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {isLogin ? "Welcome to Eyeline Optica CMS" : "Create Account"}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="********"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

        

          
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;

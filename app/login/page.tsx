import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Login() {
    return (
        <>
            <Navbar />

            <main className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 min-h-screen flex items-center justify-center px-6">

                <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

                    <h1 className="text-4xl font-bold text-center text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-center text-gray-600 mt-3">
                        Sign in to continue your journey.
                    </p>

                    <div className="mt-8 space-y-4">

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full border border-gray-900 rounded-xl px-4 py-3 text-black placeholder:text-black"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border border-gray-900 rounded-xl px-4 py-3 text-black placeholder:text-black"
                        />

                        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold">
                            Sign In
                        </button>

                    </div>

                </div>

            </main>

            <Footer />
        </>
    );
}
import { Link } from "react-router";

function ErrorPage() {
    return (
        <div className="h-screen w-full bg-gray-100 flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-[10rem] font-extrabold text-gray-800">404</h1>
                <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4">
                    Oops! Page not found.
                </p>
                <p className="text-md text-gray-600 mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    to="/"
                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl text-lg font-medium shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Go back Home
                </Link>
            </div>
        </div>
    );
}
export default ErrorPage
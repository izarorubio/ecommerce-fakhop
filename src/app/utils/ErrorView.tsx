export default function ErrorView({ message }: { message: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold">!</span>
            </div>
            <h2 className="text-xl font-semibold text-red-600">An error occurred!</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
                Try again
            </button>
        </div>
    );
}
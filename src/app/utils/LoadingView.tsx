export default function LoadingView() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-lg font-semibold text-gray-600">Cargando productos...</p>
        </div>
    );
}
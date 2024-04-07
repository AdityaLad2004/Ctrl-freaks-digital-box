// components/Chart.js

const CardNumber = ({ number, label }) => {
    return (
        <div className="flex items-center justify-center w-1/4 p-4">
            <div className="bg-white rounded-lg p-4 shadow-md text-center h-full">
                <div className="text-4xl font-bold text-gray-500">{number}</div>
                <div className="text-lg text-gray-500">{label}</div>
            </div>
        </div>
    );
};

export default CardNumber;

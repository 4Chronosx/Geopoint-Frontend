
interface InputProps {
    label: string,
    type: string,
    placeholder: string
};


export default function InputField({ label, type, placeholder }: InputProps) {
    return (
        <div className="w-full sm:px-6">
            <label htmlFor={label} className="text-xs">{label}</label>
            <input
                type={type}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                placeholder={placeholder}
            />
        </div>
    )
}
import InputField from "../../components/input-field";



export default function LoginPage() {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
                <div className="bg-white min-h-100 w-full max-w-xs p-6 sm:max-w-xl sm:px-10 rounded-2xl flex flex-col items-center">
                    <p className="p-4 mt-4 text-2xl">Login</p>
                    <InputField label="Email" type="email" placeholder="user@gmail.com"></InputField>
                    <InputField label="Password" type="password" placeholder="********"></InputField>
                    <button className="my-8 py-1 px-4 bg-blue-400 text-white rounded-2xl cursor-pointer">Submit</button>
                </div>
            </div>
        </>
    )
}
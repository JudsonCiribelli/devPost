import type { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputComponentProps {
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
  author?: string;
}

const InputComponent = ({
  name,
  type,
  placeholder,
  register,
  error,
  rules,
  author,
}: InputComponentProps) => {
  return (
    <div>
      <input
        className="w-full bg-white text-black p-2 rounded-lg outline-none mb-2"
        {...register(name, rules)}
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={author}
      />
      {error && <p className="text-red-600 mb-2 font-semibold">{error}</p>}
    </div>
  );
};

export default InputComponent;

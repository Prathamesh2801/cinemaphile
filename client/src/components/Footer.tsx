export const Footer = () => {
  return (
    <footer className="mt-64 py-4 px-6 text-neutral-400  border-t-2 border-neutral-800">
      <div className="flex flex-col items-start md:items-center justify-start md:justify-center">
        <span className="text-sm md:text-base font-semibold">
          MIT 2025 - present ©{" "}
          <a
            href="https://github.com/arx9781"
            className="underline hover:text-neutral-300 transition-all duration-200 font-doto"
          >
            aditya
          </a>{" "}
          &{" "}
          <a
            href="https://github.com/Prathamesh2801"
            className="underline hover:text-neutral-300 transition-all duration-200 font-doto"
          >
            prathamesh
          </a>{" "}
        </span>
      </div>
    </footer>
  );
};

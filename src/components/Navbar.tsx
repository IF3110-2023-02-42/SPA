import profileImage from "../assets/profile.jpg";

export default function Navbar() {
  return (
    <div className="mx-auto px-2 sm:px-6 lg:px-8 bg-purpleBg">
      <div className="w-full relative flex h-16 items-center justify-end">
        <div className="flex space-x-4 text-white">
          <a href="#" className="hover:opacity-80">
            History Exercise
          </a>
          <a href="#" className="hover:opacity-80">
            Hometaeee
          </a>
          <img
            src={profileImage}
            className="w-8 h-8 rounded-full"
            alt="Gambar Profile"
          />
        </div>
      </div>
    </div>
  );
}

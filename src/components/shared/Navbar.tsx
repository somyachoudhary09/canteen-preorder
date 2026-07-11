export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-10 py-6 text-white mx-auto max-w-[1030px] self-center">
      <h1 className="font-bold text-xl">
        Canteen Pre Order
      </h1>

      <div className="
fixed
top-6
left-1/2
-translate-x-1/2
w-[92%]
max-w-7xl
rounded-full
border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4">
        <p>Home</p>
        <p>Menu</p>
        <p>Queue</p>
      </div>
    </nav>
  );
}
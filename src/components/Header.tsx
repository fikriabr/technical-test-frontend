import { TruckIcon } from '@heroicons/react/24/outline'

const Header = () => {
  const menu = [{ text: 'Vehicles', url: '/', icon: TruckIcon }]
  return (
    <header className="fixed h-[100px] bg-[#06367c] w-full flex items-center justify-center">
      <div className="container mx-6 lg:mx-0">
        <nav className="flex gap-16">
          <a href="/" className="outline-none">
            <img alt="" src="/icon.png" className="w-[74px] h-auto" />
          </a>
          <div className="hidden lg:flex flex-1 items-center justify-end">
            <ul className="flex gap-4 text-white text-md font-bold">
              {menu.map(({ icon: MenuIcon, text, url }) => (
                <li key={text}>
                  <a
                    className="px-6 py-3 hover:bg-slate-100/10 rounded-lg flex gap-2"
                    href={url}
                  >
                    <MenuIcon className="size-6" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

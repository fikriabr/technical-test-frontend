import { MapIcon, TruckIcon } from '@heroicons/react/24/outline'
import Dropdown from './components/Dropdown'

function App() {
  const menu = [
    { text: 'Vehicles', url: '/', icon: TruckIcon },
    { text: 'View on Map', url: '/map', icon: MapIcon },
  ]
  return (
    <>
      <header className="fixed h-[100px] bg-[#06367c] w-full flex items-center justify-center">
        <div className="container mx-6 lg:mx-0">
          <nav className="flex gap-16">
            <a href="/" className="outline-none">
              <img alt="" src="/icon.png" className="w-[74px] h-auto" />
            </a>
            <div className="flex flex-1 items-center justify-end">
              <ul className="flex gap-4 text-white text-md font-bold">
                {menu.map(({ icon: MenuIcon, text, url }) => (
                  <li>
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
      <section className="pt-[100px] w-full h-screen">
        <div className="h-full w-full flex items-center justify-center p-6">
          <div className="h-full w-full rounded-xl flex flex-col">
            <div
              id="filter"
              className="h-fit border-b flex flex-col gap-4 p-4 bg-slate-300 rounded-t-xl"
            >
              <div className="flex gap-3 w-full items-center">
                <div className="text-xs uppercase font-bold text-gray-600">
                  Filter
                </div>
                {/* <input
                  name="dropdown-route"
                  className="h-[40px] px-4 rounded-lg w-full"
                  placeholder="Dropdown Route"
                />
                <input
                  name="dropdown-trips"
                  className="h-[40px] px-4 rounded-lg w-full"
                  placeholder="Dropdown Trip"
                /> */}

                <Dropdown />
                <Dropdown />
                <button
                  type="button"
                  className="rounded-lg bg-[#06367c] hover:bg-[#06367c]/20 px-8 py-2 text-white font-semibold"
                >
                  Search
                </button>
              </div>
              {/* <div className="font-semibold text-slate-600 bg-slate-100 p-4 rounded-lg">
                Applied Filter:
              </div> */}
            </div>
            <div
              id="contents"
              className="h-full bg-slate-100 rounded-b-xl p-4 overflow-y-auto relative flex flex-col gap-4"
            >
              <div id="contents-s" className="grid grid-cols-4 gap-4 h-fit">
                <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
                <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
                <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
                <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
                <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
                <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
                <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
                <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
                <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
                <div className="w-full h-[250px] bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            <div className="flex gap-2 justify-center pt-2">
              {['Prev', '1', '2', 'Next'].map((item) => (
                <button className="p-1.5 px-4 bg-gray-400 text-white rounded-md">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App

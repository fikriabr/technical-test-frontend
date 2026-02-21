import Dropdown from './components/Dropdown'
import Header from './components/Header'

function App() {
  return (
    <>
      <Header />
      <section className="pt-[100px] w-full h-screen">
        <div className="h-full w-full flex items-center justify-center p-6">
          <div className="h-full w-full rounded-xl flex flex-col">
            <div
              id="filter"
              className="h-fit border-b flex flex-col gap-4 p-4 bg-slate-300 rounded-t-xl"
            >
              <div className="flex gap-3 w-full items-center flex-col lg:flex-row">
                <div className="text-xs uppercase font-bold text-gray-600">
                  Filter
                </div>
                <div className="flex w-full gap-4">
                  <Dropdown />
                  <Dropdown />
                </div>

                <button
                  type="button"
                  className="text-[13px] rounded-lg bg-[#06367c] hover:bg-[#06367c]/20 px-8 py-2 text-white font-semibold"
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
              <div
                id="contents-s"
                className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-fit"
              >
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
                <button
                  key={item}
                  className="p-1.5 px-4 bg-gray-400 text-white rounded-md"
                >
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

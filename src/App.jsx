import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  //states
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  //functions
  async function getRecipes() {
    try {
      setLoading(true)
      setError(null)
      const request = await axios.get("https://dummyjson.com/recipes")
      if (request.status !== 200) {
        setError("Ma'lumot yuklanishda xatolik")
        return
      }
      setRecipes(request.data.recipes)
    } catch (error) {
      setError(error.massage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRecipes()
  }, [])

  if (recipes.length === 0) {
    return <h1 className="flex justify-center text-3xl text-white mt-10">Loading...</h1>
  }

  if (error) {
    return <div className="max-w-2xl mx-auto mt-9 pt-5 bg-blue-400 flex flex-col items-center shadow-2xl shadow-blue-300/50 rounded-2xl">
      <p className="text-7xl">🧱</p>
      <h1 className="text-2xl text-red-500 font-bold mt-3 ">Network Error</h1>
    </div>
  }

  return (
    <div className="max-w-7xl mx-auto mt-9">
      <h1 className="p-5 text-4xl font-bold bg-blue-600 flex justify-center text-white rounded-3xl">Menu</h1>
      <div className="box ">
        {
          recipes.length > 0 && recipes.map((item) => (
            <div key={item.id} className="px-4 py-5 bg-blue-400 text-white my-3 font-semibold text-2xl rounded-4xl">
              <h4>{item.name}</h4>
            </div>
          ))
        }
      </div>
    </div >
  )
}

export default App

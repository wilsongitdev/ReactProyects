import { useEffect, useState } from 'react'
import Card from './Card'

const Body = () => {


  const [pokemonDetailData, setPokemonDetailData] = useState([])
  const [pagObj, setpagObj] = useState({
    offset: 0,
    limit: 12,
  })
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async (pagObj) => {
      
      
      try{
        setLoading(true);
        const pokemonShowed = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pagObj.limit}&offset=${pagObj.offset}`).then(res => res.json());
        const listPokemonMainData = await Promise.all(pokemonShowed.results.map(async(res) => {
          let pokemonMainData = await fetch(res.url).then(res1 => res1.json());
          pokemonMainData['personalData'] = await Promise.all(
            pokemonMainData.forms.map(async(data) =>  {
              let formdata = await fetch(data.url).then(res => res.json())
              return formdata
            })
          )
          return pokemonMainData;
        }))
        setPokemonDetailData(listPokemonMainData)
      }
      catch(error){
        console.error(error);
      }
      finally{
        setLoading(false)
      }
      
    }
    fetchAll(pagObj);
    
  }, [pagObj])
  
  const handleButtonIncreaseClick = () => {
    setpagObj({
      ...pagObj,
      offset: pagObj.offset + pagObj.limit
    })
  };

  const handleButtonDecreaseClick = () => {
    setpagObj({
      ...pagObj,
      offset: pagObj.offset - pagObj.limit
    })
  }

  if (loading){
    // eslint-disable-next-line react/no-unescaped-entities
    return <>"Cargando"</>
  }
  return (
    <div className='container mx-auto flex flex-col gap-6 p-4 sm:p-6'>
        <div className='flex flex-row justify-between sticky top-20'>
          <button type="button" className="bg-red-400 p-3 rounded-xl" onClick={pagObj.offset > 0? handleButtonDecreaseClick : null}>&larr;</button>
          <button type="button" className='bg-red-400 p-3 rounded-xl' onClick={handleButtonIncreaseClick}>&#8594;</button>
        </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {pokemonDetailData?.map(objData => (
          <div key={objData.id} className='basis-11/12 md:basis-30'>
            <Card {...objData}/>
          </div>
        ))}
      </div>
      {/* <button type="button" className="bg-red-400 p-3 rounded-xl fixed top-1/2 left-4" onClick={pagObj.offset > 0? handleButtonDecreaseClick : null}>Anterior</button>
      <button type="button" className='bg-red-400 p-3 rounded-xl fixed top-1/2 right-4' onClick={handleButtonIncreaseClick}>Siguiente</button> */}
      
    </div>
  )
}

export default Body

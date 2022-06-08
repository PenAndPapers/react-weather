import {ChangeEvent, useEffect, useState} from 'react'

interface ComponentProps {
  onSearch : Function;
}

const InputSearch = (props: ComponentProps) => {
  const [city, setCity] = useState('California')
  const [timer, setTimer] = useState(0)

  const handleSearch = (payload: string) => {
    if(timer) clearTimeout(timer)
    setTimer(
      setTimeout(() => {
        props.onSearch(payload)
      }, 2000)
    )
  }

  const handleSetCity = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value)
    handleSearch(e.target.value)
  }

  // trigger search on component mount
  useEffect(() => {
    props.onSearch(city)
  }, [])

  return (
    <div className="search">
      <input type="text" value={city} placeholder="Search city..." autoFocus onChange={handleSetCity} />
    </div>
  )
}

export default InputSearch
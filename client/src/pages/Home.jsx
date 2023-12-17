import React,{ useState, useEffect } from 'react'

import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, contract, getCampaigns } = useStateContext();
  return (
    <div>Home</div>
  )
}

export default Home
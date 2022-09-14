import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';


const Cryptocurrencies = ({simplified}) => {
  const count = simplified? 10 : 100
  
  const {data: cryptoList, isFetching} = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(cryptoList?.data.coins)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=> {
      const filteredData = cryptoList?.data?.coins.filter((crypto) => crypto.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setCryptos(filteredData)
    
  }, [searchTerm, cryptoList])

  if(isFetching) return 'loading...'
  return (
    <>
    {!simplified && (
      <div className='search-crypto'>
        <input className='search-input' placeholder="Search Cryptocurrency" onChange={(event) => setSearchTerm(event.target.value) }/>
      </div>
    )}  
      <Row gutter={[32, 32]} className='crypto-card-container' >
          {cryptos?.map((crypto) => (
            <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid} >
              <Link to = {`/crypto/${crypto.uuid}`}>
                <Card
                  title={`${crypto.rank}. ${crypto.name}`}
                  extra={<img className='crypto-image' src={crypto.iconUrl} alt={`${crypto.name}`}/>}
                  hoverable
                >
                  <p>Price: {millify(crypto.price)}</p>
                  <p>Market Cap: {millify(crypto.marketCap)}</p>
                  <p>Daily Change: {millify(crypto.change)}</p>
                </Card>
              </Link>
              
            </Col>
          ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

import "./Body.css";
import ShimmerRestro from '../shimmer/ShimmerRestro';

const imgUrl = 'https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_850,h_504/';

function Body() {
  const [restaurants, setRestaurant] = useState([]);
  const [filteredRestra, setfilteredRestra] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const response = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      const data = await response.json();
      console.log("data", data.data.cards[2].card.card.gridElements.infoWithStyle.restaurants);
      const restaurantsData = data.data.cards[2].card.card.gridElements.infoWithStyle.restaurants || [];
      setRestaurant(restaurantsData);
      setfilteredRestra(restaurantsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function filteredRestaurant(searchText, restaurantList) {
    const filteredRestra = restaurantList.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setfilteredRestra(filteredRestra);
    console.log("filteredRestra", filteredRestra);
  }

  function handleInputChange(event) {
    const { value } = event.target;
    setSearchText(value);
    filteredRestaurant(value, restaurants);
  }

  return (filteredRestra.length === 0) ? (<ShimmerRestro />) : (
    <>
      <div className='restrosearch'>
        <h2 className='restroheading'>Restaurants with online food delivery</h2>
        <div>
          <input
            placeholder='Search'
            value={searchText}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className='Body'>
        {filteredRestra.map((item, index) => {
          return (
            <div className="restrocard" key={index}>
              <img src={imgUrl + item.info.cloudinaryImageId} alt='restro Img' />
              <p className='restName'>{item.info.name}</p>
              <div className="rating-container">
                <AiFillStar />
                <p>{item.info.avgRating}</p>
              </div>
              <p>Paragraph 3</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Body;

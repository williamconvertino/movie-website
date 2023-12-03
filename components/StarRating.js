import React, { useState } from 'react';

import { FaStar } from 'react-icons/fa';

export default function StarRating({rating, setRating}) {
    
    const [hover, setHover] = useState(null);

    return (
        <>
            {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label key={index}>
                <input style={{width: 0}}
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating ? setRating(currentRating) : null}
                />
                  <FaStar  
                    size={20}
                    color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setRating ? setHover(currentRating) : null}
                    onMouseLeave={() => setRating ? setHover(null) : null}
                    />
              </label>
            );
          })
        
        }
          
          </>
    )
}
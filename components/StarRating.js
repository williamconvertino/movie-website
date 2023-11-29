import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating() {
    
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label>
                <input style={{width: 0}}
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => setRating(currentRating)}
                />
                  <FaStar  
                    size={20}
                    color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                    />
              </label>
            );
          })}
          </div>
    )
}
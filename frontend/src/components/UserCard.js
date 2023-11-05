import React,{useState,useRef,useEffect} from 'react'
import {Link,useNavigate} from 'react-router-dom';

// importing css files 
import { Card} from 'react-bootstrap';

const UserCard = ({user}) => {

  return (
    <Link  to={`/profile/${user._id}`}>
        <Card className="productCard">
            <Card.Img variant="top" src={user.Photo} />
            <Card.Body>
                <Card.Title>
                  <div>
              
                {user.name}
               
                    </div>
                </Card.Title>
                <Card.Text>
                </Card.Text>
            </Card.Body>
        </Card>
    </Link>
  )
}

export default UserCard



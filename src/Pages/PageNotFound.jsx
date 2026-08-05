import { useNavigate } from 'react-router-dom'
import '../Styling/PageNotFound.css'

function PageNotFound () {
 const navigate = useNavigate();
    return(
        <>
          <div className="whole-thing">
            <h1>404</h1>
            <h2 className="four"> Oh My Potholes! What are you doing here </h2>
          </div>

          <div className="redirect">
             <button className="button" onClick={() => navigate(-1)}>Go back </button>
          </div>
        </>
    )
}

export default PageNotFound
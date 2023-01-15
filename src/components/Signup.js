import React, { useState } from 'react'
import signpic from "../images/signpic.webp";
import { NavLink, useHistory } from 'react-router-dom';

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "", email: "",phone: "",work: "",password: "",cpassword: ""
  });

  let name, value;
  const handleInputs =(e) => {
    console.log(e);
    name=e.target.name;
    value=e.target.value;

    setUser({...user, [name]:value});
  }
    const PostData = async (e) => {
      e.preventDefault();
      const {name, email, phone, work, password, cpassword } = user;

      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          name, email, phone, work, password, cpassword
        })
      });
    
      const data = await res.json();

      if(data.status === 422 || !data) {
        window.alert("INvalid Registration");
        console.log("INvalid Registration");
      } else {
        window.alert("Registration Successfull");
        console.log("Successful Registration");
        history.pushState("/login");
      }
    }
 // }
  return (
    <>
        <section className="signup">
          <div className="container mt-5">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="register-form">

                  <div className="form-group">
                    <label htmlFor="name">
                        <i class="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input type="text" name="name" id="name" autocomplete="off" placeholder="Your Name" 
                    value={user.name} onChange={handleInputs} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                        <i class="zmdi zmdi-email material-icons-name"></i>
                    </label>
                    <input type="email" name="email" id="email" autocomplete="off" placeholder="Your Email" value={user.email} onChange={handleInputs} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                        <i class="zmdi zmdi-phone-in-talk material-icons-name"></i>
                    </label>
                    <input type="number" name="phone" id="phone" autocomplete="off" placeholder="Your Phone" value={user.phone} onChange={handleInputs} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="work">
                        <i class="zmdi zmdi-slideshow material-icons-name"></i>
                    </label>
                    <input type="text" name="work" id="work" autocomplete="off" placeholder="Your Profession" value={user.work} onChange={handleInputs}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                        <i class="zmdi zmdi-lock material-icons-name"></i>
                    </label>
                    <input type="password" name="password" id="password" autocomplete="off" placeholder="Your Password" value={user.password} onChange={handleInputs}/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cpassword">
                        <i class="zmdi zmdi-lock material-icons-name"></i>
                    </label>
                    <input type="password" name="cpassword" id="cpassword" autocomplete="off" placeholder="Confirm Your Password" value={user.cpassword} onChange={handleInputs}/>
                  </div>

                  <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup" classname="form-submit" value="register" onClick={PostData}/>
                  </div>
                </form>
                </div>

                <div className="signup-image">
                  <figure>
                    <img src={signpic} alt="registration pic" />
                  </figure>
                  <NavLink to="/login" className="signup-image-link">I am already registered</NavLink>
                </div>
              
            </div>
          </div>
        </section> 
    </>
  )
}

export default Signup

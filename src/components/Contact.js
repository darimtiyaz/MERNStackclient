import React, { useState, useEffect} from 'react'

const Contact = () => {

  //const history = useHistory();
  const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});

  const userContact = async () => {
    try {
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
        //  Accept: "appllication/json",
          "Content-Type": "application/json"
        },
      //  credentials: "include"
      });

      const data = await res.json();
      console.log(data);
      setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
        console.log(err);
        //history.push('/login');
    }
  }

  useEffect(() => {
    userContact();
  }, []);

  //we are storing data in  states
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]:value });
  }
  // send the data to the backend
  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;
    const res = await fetch('/contact', {
      method: "POST",
      headers: {
        "Contact-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, phone, message
      })
    });
    const data = await res.json();

    if(!data) {
      console.log("message not send");
    }else {
      alert("Message Send");
      setUserData({ ...userData, message: ""});
    }
  }

  return (
    <>
      <div className="contact_info mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              {/* phone number */}
              <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                <div className="contact_info_contact">
                  <div className="contact_info_title">
                    Phone
                  </div>
                  <div className="contact_info_text">
                    +91 1111 456 7896
                  </div>
                </div>
              </div>

               {/* email  */}
               <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                <div className="contact_info_contact">
                  <div className="contact_info_title">
                    Email
                  </div>
                  <div className="contact_info_text">
                    darimtiyaz@gmail.com
                  </div>
                </div>
              </div>

               {/* address */}
               <div className="contact_info_item d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/office/24/000000/iphone.png" alt="phone" />
                <div className="contact_info_contact">
                  <div className="contact_info_title">
                    Address
                  </div>
                  <div className="contact_info_text">
                    sopore, Baramulla, J&k
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* contact us form*/}
      <div className="contact_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_form_title m-auto">
                  Get in Toch
                </div>
                <form method="POST" id="contact_form">
                  <div className="contact_form_name d-flex justify-content-between align-items-between">
                    <input type="text" id="contact_form_name"
                        className="contact_form_name input_field"
                        value={userData.name}
                        onChange={handleInputs}
                        placeholder="your name" required/>
                    
                    <input type="email" id="contact_form_email"
                        className="contact_form_email input_field"
                        value={userData.email}
                        onChange={handleInputs}
                        placeholder="your Email" required />

                    <input type="number" id="contact_form_phone"
                        className="contact_form_phone input_field"
                        value={userData.phone}
                        onChange={handleInputs}
                        placeholder="your phone number" required />    
                  </div>

                  <div className="contact_form_text mt-5">
                    <textarea className="text_field contact_form_message"
                    value={userData.message} 
                    onChange={handleInputs} placeholder="Message" id="" cols="123" rows="5"></textarea>
                  </div>

                  <div className="contact_form_button">
                    <button type="submit" className="button contact_submit_button"
                    onClick={contactForm}>Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact

import React,{useState} from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [state, setstate] = useState("Sign up")
  const [formData, setformData] = useState({
    username:"",
    password:"",
    email:""
  })
  const changeHandler = (e) => {
    setformData({
        ...formData, // Spread the existing formData
        [e.target.name]: e.target.value // Update the specific field
    });
};
  

  const login = async () => {
     console.log("login function executed" , formData)
     let responseData;
     try {
         const response = await fetch('http://localhost:4000/login', {
             method: 'POST',
             headers: {
                 Accept: 'application/form-data',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(formData),
         });
 
         responseData = await response.json();
         console.log(responseData); 
         
         if (responseData.success) {
             localStorage.setItem('auth-token', responseData.token);
             window.location.replace("/"); 
         } else {
             alert(responseData.errors)
            
         }
     } catch (error) {
         console.error("An error occurred during signup: ", error);
     }
  }

  const signup = async () => {
    console.log("signup function executed", formData);
    let responseData;
    try {
        const response = await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        responseData = await response.json();
        console.log(responseData); 
        
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/"); 
        } else {
            alert(responseData.errors)
           
        }
    } catch (error) {
        console.error("An error occurred during signup: ", error);
    }
};

  return (
    <div className='LoginSignup'>
      <center>
      <div className="LoginSignupContainer">
       <center> <h1>{state}</h1></center>
        <div className="LoginSignupFields">
          {state==="Sign up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="text" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="text" placeholder='Your Password' />
        </div>
        <br />
        <div className="LoginSignup_Agreement">
        <input type="checkbox" /> 
        <p>I agree with the terms of use.</p></div>
        <button onClick={() => { state==="Sign up"?signup():login()
          
        }
        }>Continue</button>
        {state==="Sign up"?<p className='LoginSignup_Login'>Already have an Account? <span onClick={()=>{setstate("Login")}
        }  >Login Here</span></p>:<p className='LoginSignup_Login'>Want to Create an Account? <span onClick={()=>{setstate("Sign up")}
        }  >Click Here</span></p>}
      </div> 

      </center>
    </div>
  )
}

export default LoginSignup

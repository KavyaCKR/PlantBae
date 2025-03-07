import React, { useEffect, useState } from 'react';
import "../styles/create.css";// Assuming you have a CSS file for styles
import { useUser } from '@clerk/clerk-react';
import api from '../api/db';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SignUp = () => {
    const [formData, setFormData] = useState({
        name:'',
        email: '',
        phone: '',
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const user = useUser();

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'phone':
                if (!value.replace(/\D/g, '')) error = 'Please enter a valid number';
                break;
            case 'email':
                if (!value.includes('@') || !value.includes('.com')) error = 'Please provide a valid Email';
                break;
            case 'password':
                if (value.length < 8) error = 'Password requires minimum 8 characters';
                break;
            case 'confirmPassword':
                if (value !== formData.password) error = 'Password did not match';
                break;
            default:
                if (!value) error = '*This field is Required';
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach(key => {
            newErrors[key] = validateField(key, formData[key]);
        });
        setErrors(newErrors);
        if (Object.values(newErrors).every(x => !x)) {
            const response = await api.create_profile(formData.name, formData.email, formData.phone);

            if(response.data.content.success) {
                toast.success(response.data.content.success)
                navigate("/dashboard")
                return ;
            }
            console.log(response)
            toast.error(response.data.content.error);
            return ;
            // Handle form submission
        }
    };

    useEffect(() => {

        if(user && user.user && user.user.primaryEmailAddress) {
            async function isUser() {
                const response = await api.check_user(user.user.primaryEmailAddress.emailAddress);

                if(response.data.content.success) {
                    console.log(response)
                    navigate("/dashboard")
                    return ;
                }

            }

            isUser()
        }

    },[user?.user?.primaryEmailAddress?.emailAddress])

    useEffect(() => {
        if (user && user.user && user.user.primaryEmailAddress) {
          console.log("User:", user);
      
          // Check if the email has actually changed
          setFormData((prevFormData) => {
            if (prevFormData.email !== user.user.primaryEmailAddress.emailAddress) {
              return {
                ...prevFormData,
                email: user.user.primaryEmailAddress.emailAddress,
              };
            }
            return prevFormData; // No change, return previous state
          });
        }
      }, [user?.user?.primaryEmailAddress?.emailAddress]); // Use specific property as dependency

    return (
        <main className="card-container slideUp-animation">
            <div className="image-container">
                <h1 className="company">Garden</h1>
                <img src="src/api/image.png" className="illustration" alt="" />
                <p className="quote">Create account and let the magic begin!!</p>
            </div>
            {user &&
            <form onSubmit={handleSubmit}>
                <div className="form-container slideRight-animation">
                    <h1 className="form-header">Get started!</h1>
                    {['name', 'email', 'phone'].map((field, index) => (
                        <div className="input-container" key={index}>
                            <input
                                type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                                name={field}
                                id={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                            />
                            <span>{field.split(/(?=[A-Z])/).join(' ')}</span>
                            {errors[field] && <div className="error">{errors[field]}</div>}
                        </div>
                    ))}
                    <div id="btm">
                        <button type="submit" className="submit-btn">Create Account</button>
                        <p className="btm-text">
                            Already have an account..? <span className="btm-text-highlighted">Log in</span>
                        </p>
                    </div>
                </div>
            </form>}
        </main>
    );
};

export default SignUp; 
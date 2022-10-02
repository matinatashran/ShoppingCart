import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// style
import style from './signUpAndSignIn.module.css';

// components
import Field from './field/Field';

// helper
import { notification } from '../notification/Notify';

const data = [
    {id: 1, name: "Email", type: "text", value: "", error: "", touch: false},
    {id: 2, name: "Password", type: "password", value: "", error: "", touch: false},
];


const SignIn = () => {
    
    const navigate = useNavigate();

    const [changeData, setChangeData] = useState(false);

    const [touch, setTouch] = useState({
        Email: false,
        Password: false,
    });

    const submitHandler = (event) => {
        event.preventDefault();

        let i = 0;
        while (i < data.length){
            notification("An Error Ocured!", "ERROR");
            if (data[i].error){
                setTouch({
                    Email: true,
                    Password: true,
                });
                break;
            }
            i++;
        }
        console.log(1)
        if (i === (data.length)){
            const userData = JSON.parse(window.localStorage.getItem("userData"));
            
            const userEmail = data[0].value;
            const userPass = data[1].value;
            console.log(userData)
            let i = 0;
            while (i < userData.length){
                if (userData[i].email === userEmail && userData[i].password === userPass){
                    notification(`${userData[i].name} welcom.`, "SUCCESS");

                    userData[i].isLogin = true;
                    window.localStorage.setItem("userData", JSON.stringify(userData))

                    navigate("/home", { replace: true })

                    break;
                }
                i++;
            }
            
            if (i === userData.length)
                notification("Email or Password not corrected!", "ERROR"); 
        }
    }

    return (
        <div className={style.signInContainer}>
            <form className={style.fields} onSubmit={submitHandler}>
                <div className={style.pageTitle}>
                    Enter Your Account
                </div>
                {
                    data.map(item =>
                        <Field
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            data={data}
                            changeData={changeData}
                            touch={touch}
                            setTouch={setTouch}
                            setChangeData={setChangeData}
                            pageType={"SignIp"}
                        />
                    )
                }
                <div className={style.pageBtns}>
                    <button type='submit'>Sign In</button>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
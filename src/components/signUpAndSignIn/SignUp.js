import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from '../notification/Notify';


// style
import style from './signUpAndSignIn.module.css';

// components
import Field from './field/Field';


const data = [
    {id: 1, name: "Name", type: "text", value: "", error: ""},
    {id: 2, name: "Email", type: "text", value: "", error: ""},
    {id: 3, name: "Password", type: "password", value: "", error: ""},
    {id: 4, name: "ConfirmPassword", type: "password", value: "", error: ""},
];


const SignUp = () => {

    const navigate = useNavigate();

    const [changeData, setChangeData] = useState(false);

    useEffect(() => {
        const usersData = JSON.parse(window.localStorage.getItem("userData"));
        if (!usersData){
            window.localStorage.setItem("userData", JSON.stringify([]))
        }
    }, [])

    const [touch, setTouch] = useState({
        Name: false,
        Email: false,
        Password: false,
        ConfirmPassword: false,
    });

    const submitHandler = (event) => {
        event.preventDefault();

        let i = 0;
        while (i < data.length){
            notification("An Error Occured.", "ERROR");
            if (data[i].error){
                setTouch({
                    Name: true,
                    Email: true,
                    Password: true,
                    ConfirmPassword: true,
                });
                break;
            }
            i++;
        }

        if (i === (data.length)){
            const usersData = JSON.parse(window.localStorage.getItem("userData"));

            let i= 0;
            while(i < usersData.length){
                if (usersData[i].email === data[1].value){
                    notification("This email has already been used!", "ERROR");
                    console.log(1)
                    break;
                }
                i++
            }

            if (i === usersData.length){
                usersData.push({
                    name: data[0].value,
                    email: data[1].value,
                    password: data[2].value,
                    isRegister: true,
                    isLogin: false,
                })
                
                window.localStorage.setItem("userData", JSON.stringify(usersData))
                
                notification(`${data[0].value} welcom.`, "SUCCESS");
                
                navigate("/home", { replace: true });
            }
        }
    }

    return (
        <div className={style.signUpContainer}>
            <form className={style.fields} onSubmit={submitHandler}>
                <div className={style.pageTitle}>
                    Create Acount
                </div>
                {
                    data.map(item =>
                        <Field
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            type={item.type}
                            data={data}
                            touch={touch}
                            setTouch={setTouch}
                            changeData={changeData}
                            setChangeData={setChangeData}
                            pageType={"SignUp"}
                        />
                    )
                }
                <div className={style.pageBtns}>
                    <button type='submit'>Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
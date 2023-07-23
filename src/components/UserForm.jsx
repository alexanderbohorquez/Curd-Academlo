import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"


const UserForm = ({ getUsers, userSelected, setUserSelected, closeForm }) => {

    const { handleSubmit, register, reset } = useForm();
    const [isVisible, setIsVisible] = useState(false)
    const inputNull = { first_name: "", last_name: "", email: "", password: "", brithday: "" };

    useEffect(() => {
        if (userSelected) {
            reset(userSelected);
        } else {
            reset(inputNull);
        }
    }, [userSelected]);

    const submit = (data) => {
        status()
        if (userSelected) {
            axios
                .put(`https://users-crud.academlo.tech/users/${userSelected.id}/`, data)
                .then(() => {
                    getUsers()
                });
        } else {
            axios
                .post("https://users-crud.academlo.tech/users/", data)
                .then(() => {
                    getUsers();
                    reset(inputNull);
                });
        }
    };

    const status = () => {
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
            setUserSelected(null)
            closeForm()
        }, 1500)
    }

    return (
        <div className='container__form'>
            <div className='card__form'>
                <div className='border__form'>
                    <i onClick={() => closeForm()} className='bx bx-x bx-flip-horizontal bx-tada'></i>
                    <h2>Formulario de usuarios</h2>
                    {isVisible ?
                        <div className='status'>
                            <h3>{userSelected ? "Actualizando" : "Nuevo Usuario creado"}</h3>
                            <i class='bx bx-x bx-flip-vertical' ></i>
                        </div> : 
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="input-container_m">

                            <div className='container_name'>
                                <input required type="text" id="first_name" placeholder='Nombre' {...register("first_name")} />
                                <input required type="text" id="last_name" placeholder='Apellido' {...register("last_name")} />
                            </div>
                        </div>
                        <div className="input-container">
                            
                            <input required type="email" id="email" placeholder='Correo electrónico' {...register("email")} />
                        </div>
                        <div className="input-container">
                            <input required type="password" id="password" placeholder='Contraseña' {...register("password")} />
                        </div>
                        <div className="input-container">
                        <input required type="date" id="birthday" {...register("birthday")} placeholder="dd/mm/aaaa" /></div>
                        
                        <button className='btn__form'>{userSelected ? "Actualizar" : "Nuevo usuario"}</button>
                    </form>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserForm;
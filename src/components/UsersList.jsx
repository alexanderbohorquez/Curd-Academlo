import React, { useEffect, useState } from 'react';

const UserList = ({ usersList, selectUser, getForm, warning }) => {
    const [orderedList, setOrderedList] = useState([]);

    useEffect(() => {
        const orderedUsers = usersList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setOrderedList(orderedUsers.reverse());
    }, [usersList]);

    return (
        <div className='list__users'>
            <h2>Listado de Usuarios</h2>
            <div className='sumary__list'>
                <p><strong>Usuarios Existentes: </strong>{usersList.length}</p>
                <button className='btn btn-primary-new' onClick={() => getForm()}>Nuevo usuario</button>
            </div>
            <div className="card-group">
                {orderedList.map((user) => (
                    <div key={user.id} className="card">
                        <div className="card-body">
                            <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                            <p className="card-text"><strong>E-mail:</strong> {user.email}</p>
                            <p className="card-text"><strong>Fecha de Nacimiento:</strong> {user.birthday}</p>
                            <br />
                            <div className="btn-group" role="group" aria-label="Acciones">
                                <button className='btn-primary' onClick={() => selectUser(user)}>Editar</button>
                                <button className='btn-danger' onClick={() => warning(user)}>Eliminar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;

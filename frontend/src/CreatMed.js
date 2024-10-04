import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatMed(){
const [errorMessage, setErrorMessage] = useState("");
const[nom,setnom] = useState('')
const[nbj,setnbj] = useState('')
const[tj,settj] = useState('')
const navigate = useNavigate()


function handelSubmit(event){
    event.preventDefault();
    if(nbj<0||tj<0){
        if(tj<0){
            setErrorMessage(   <div className="alert alert-warning" role="alert">
            taux journalier "{tj}" invalide 
        </div>);
        return;
        }else{
            setErrorMessage(   <div className="alert alert-warning" role="alert">
            nombre de jour "{nbj}" invalide 
        </div>);
        return;
        }

    }
    if (!nom || !nbj || !tj) {
        setErrorMessage(
            <div className="alert alert-warning" role="alert">
                Vous devez remplir tous les champs.
            </div>
        );
        return;
    }
    axios.post('http://localhost:8004/add/', { nom , nbj , tj})
    .then(res => {
        console.log(res);
        navigate('/');
    }).catch(err => console.log(err));
}

    return(
       <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handelSubmit}>
                <h2>ajouter nouveau medecin</h2>
                <h3>{errorMessage}</h3>
                <div className="mb-2">
                    <label htmlFor="">Nom</label>
                    <input type='text' placeholder="le nom" className="form-control"
                    onChange={e=> setnom(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Nombre de jour</label>
                    <input type="number" placeholder="nombre de jour" className="form-control"
                    onChange={e=> setnbj(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Taux journalier</label>
                    <input type="number" placeholder="taux journalier" className="form-control"
                    onChange={e=> settj(e.target.value)}/>
                </div>
                <button className="btn btn-success">envoyer</button>
            </form>

        </div>
       </div>
    )
}
export default CreatMed
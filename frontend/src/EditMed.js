import React from "react";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function EditMed(){

    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search);
    // const nomu = searchParams.get('nom');
    // const nbju = searchParams.get('NombreJ');
    // const tju = searchParams.get('TauxJ');
    
    const [errorMessage, setErrorMessage] = useState("");
    const[nom,setnom] = useState('');
    const[nbj,setnbj] = useState('');
    const[tj,settj] = useState('');
    const navigate = useNavigate();
    let {Numed,nomu,nbju,tju}=useParams();
    // let {Numed,nomu,NombreJu,TauJu} = useParams();
    // console.log(nomu,NombreJu,TauJu);
    
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
        axios.put("http://localhost:8004/ed/"+ Numed,{nom,nbj,tj})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }
    



    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
            <form onSubmit={handelSubmit}>
                <h2>editer medecin</h2>
                <h1>{Numed}</h1>
                <h3>{errorMessage}</h3>
                <div className="mb-2">
                    <label htmlFor="">Nom</label>
                    <input type='text' placeholder="le nom" className="form-control" defaultValue={nomu}
                    onChange={e=> setnom(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Nombre de jour</label>
                    <input type="number" placeholder="nombre de jour" className="form-control" defaultValue={nbju}
                    onChange={e=> setnbj(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Taux journalier</label>
                    <input type="number" placeholder="taux journalier" className="form-control" defaultValue={tju}
                    onChange={e=> settj(e.target.value)}/>
                </div>
                <button className="btn btn-success">modifier</button>
            </form>

        </div>
       </div>

    )
}

export default EditMed
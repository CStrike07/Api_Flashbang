import React from 'react'
import { useState ,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const Seller = () => {
    const history = useHistory()
    const [name,setName]=useState("")
    const [job,setJob] =useState("")
    const [cost,setCost] = useState("")
    const [workExperience,setWorkExperience]=useState("")
    const [jobDescription,setJobDescription]=useState("")
    const [address,setAddress] = useState("")
    const [phoneNumber,setPhoneNumber] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] =  useState("")
    useEffect(()=>{
        if(url){
        fetch("/",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                

            },
            body:JSON.stringify({
                name,
                address,
                phoneNumber,
                job,
                cost,
                jobDescription,
                workExperience,
                pic:url,

            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"red"})
            }else{
                
                M.toast({html:"created post succesfully",classes:"green"})
                history.push("/profile")
            }
            
        }).catch((error)=>{
            console.log(error)
        })
    }

    },[url])

    const submitDetails = () =>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","soacial-media-paltform")
        data.append("cloud_name","socialmediaplatform")
        fetch("https://api.cloudinary.com/v1_1/socialmediaplatform/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        }).catch(err=>{
            console.log(err)
        })
    }
        return (
            <div className = "container center">
                <h4>Seller</h4>
                <div className="card input field" style={{
                    margin:"30px auto",
                    maxWidth:"500px",
                    padding:"20px",
                    textAlign:"center"

                }}>
                    <input type="text" placeholder="Full Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}/>
                    <input type="text" placeholder="Address"
                    value={address}
                    onChange={(e)=>setAddress(e.target.value)}/>
                    <input type="text" placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}/>

                    <input type="text" placeholder="Job"
                    value={job}
                    onChange={(e)=>setJob(e.target.value)}/>

                    <input type="text" placeholder="Cost Per hour"
                     value={cost}
                    onChange={(e)=>setCost(e.target.value)}/>

                    <input type="text" placeholder="Years of Work Experience"
                     value={workExperience}
                    onChange={(e)=>setWorkExperience(e.target.value)}/>

                    

                    <textarea className="materialize-textarea" data-length="120" placeholder="Job description"
                    value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)}/>

                    <div className="file-field input-field">
                    <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
                    </div>
                    <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                    </div>

                    </div>
                    <button className="waves-effect waves-light btn" onClick={()=>submitDetails()} >
                        submit Details
                    </button>
                </div>
                
                
            </div>
        )
    
}


export default Seller

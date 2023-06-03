import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Destinations from './Map/Destinations';

function Detail() {
    const location = useLocation();

    const pathname = location.pathname;
    const id = pathname.split('/detail/')[1];

    const [pharmacy, setPharmacy] = useState(null);

    // Fonction pour récupérer la liste des cities depuis le backend 
    const fetchPharmacies = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/pharmacies/withgardes');
            console.log(response.data.filter(phr => phr.id == id)[0])
            setPharmacy(response.data.filter(phr => phr.id == id)[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const [latlong, setLatLong] = useState({
        lat: 31.5962347,
        long: -7.9685221
    })
    console.log("detail:", latlong)
    useEffect(() => {
        fetchPharmacies();
    }, [])

    return pharmacy != null && (
        <div className='flex flex-col py-10 px-5 space-y-5'>
            <div className='flex space-x-3'>
                <img className="w-[200px] h-[200px] rounded-md object-cover" src={pharmacy.image} />
                <div className='flex flex-col'>
                    <h1 className='font-semibold text-xl'>
                        {pharmacy.nom}
                    </h1>
                    <div className='flex items-center space-x-1 pt-1 text-stone-400'>
                        <i className='bx bx-map' ></i>
                        <span>{pharmacy.adresse}</span>
                    </div>
                    {pharmacy.gardeId != null && pharmacy.gardeId == 1 &&
                        <div className='flex items-center pt-1 space-x-1 text-main'>
                            <i className='bx bxs-moon' ></i>
                            <span className='text-sm'>Night Garde</span>
                        </div>
                    }

                    {pharmacy.gardeId != null && pharmacy.gardeId == 2 &&
                        <div className='flex items-center pt-1 space-x-1 text-orange-700'>
                            <i className='bx bxs-sun' ></i>
                            <span className='text-sm'>Day Garde</span>
                        </div>
                    }

                    {pharmacy.gardeId == null &&
                        <div className='flex items-center pt-1 space-x-1 text-blue-700'>
                            <i className='bx bxs-time'></i>
                            <span className='text-sm'>24/24h</span>
                        </div>
                    }
                    <p className='w-1/3 pt-2 text-justify text-sm text-gray-700'>
                      simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </div>

            <Destinations field={{
            lat:pharmacy.latitude,
            long:pharmacy.longitude}}/>

        </div> 
    )
}

export default Detail

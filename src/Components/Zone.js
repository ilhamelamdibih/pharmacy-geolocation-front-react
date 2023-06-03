import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const Zone = () => {
 
    const [zones, setZones] = useState([]);
    const [zoneName, setZoneName] = useState('');
    const [zoneNameEdit,setZoneNameEdit] = useState('')
    const [zoneIdEdit,setZoneIdEdit] = useState('')
    const location = useLocation();
    const ville_id = new URLSearchParams(location.search).get('ville');
    const ville_Name = new URLSearchParams(location.search).get('name');

    const fetchZones = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/villes/idVille/${ville_id}/zones`);
            setZones(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const addZone = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/zones/save', { nom: zoneName , ville:{id:ville_id} });
            setZones([...zones, response.data]);
            setZoneName('');
            fetchZones()
        } catch (error) {
            console.error(error);
        }
    };
    const updateZone = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/zones/update', {id: zoneIdEdit, nom: zoneNameEdit , ville:{id:ville_id} });
            const updatedZones = zones.map((zone) => {
                if (zone.id === response.data.id) {
                    return response.data;
                }
                return zone;
            });
            setZones(updatedZones);
            setZoneIdEdit('');
            setZoneNameEdit('');
            fetchZones();
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteZone = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8080/api/zones/delete/${id}`);
                    const updatedZones = zones.filter((zone) => zone.id !== id);
                    setZones(updatedZones);
                    fetchZones();
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                } catch (error) {
                    console.error(error);
                }
            }
          })
    };
    const handlerAdd = (e) => {
        e.persist()
        setZoneName(e.target.value);
    };
    const handlerEdit= (e) => {
        e.persist()
        setZoneNameEdit(e.target.value);
    }
    useEffect(() => {
        fetchZones();
    });

    const showModal = (id,nom) => {
        const modal=document.querySelector('.editModal')
        modal.classList.add('flex');
        modal.classList.remove('hidden');
        setZoneIdEdit(id);
        setZoneNameEdit(nom);
    };
    const closeModal = () => {
        const modal=document.querySelector('.editModal')
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    };
    
    return (
        <div className='py-10 px-7'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold text-center py-5'><c className='text-main'>{ville_Name}</c> : List of Zones</h1>
                <div className='relative flex items-center'>
                    <input name='zoneName' value={zoneName} onChange={handlerAdd} type='text' placeholder='Zone Name' className='outline-none border rounded p-2 text-sm text-gray-600 w-[250px]' />
                    <span onClick={addZone} className='text-main text-sm absolute right-2 cursor-pointer'>Add</span>
                </div>
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-white uppercase bg-main">
                        <tr className="grid grid-cols-3">
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {zones.map((zone, index) => (
                            <tr key={zone.id} className='grid grid-cols-3 bg-white border-b'>
                                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap grid grid-cols-3'>{index + 1}</th>
                                <td className='px-6 py-4 text-black'>{zone.nom}</td>
                                <td className='px-6 py-4 flex items-center space-x-2'>
                                    <i onClick={()=>showModal(zone.id,zone.nom)} className='bx bx-edit-alt bg-[#FFB30D] text-white p-2 rounded cursor-pointer' ></i>
                                    <i onClick={()=>deleteZone(zone.id)} className='bx bx-trash-alt bg-red-700 text-white p-2 rounded cursor-pointer' ></i>
                                </td>
                            </tr>
                        ))}
                          {
                            zones.length==0 && 
                            <tr className='grid grid-cols-3'>
                                <td className='col-span-3 py-3 flex items-center justify-center font-bold bg-orange-700 text-white'>No zones to show</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className='editModal hidden items-center justify-center h-screen w-full top-0 fixed'>
                    <div className='flex bg-white h-[300px] w-[400px] shadow-lg rounded flex-col space-y-3 py-10 px-6 items-center justify-center relative'>
                            <i onClick={closeModal} className='bx bx-x text-lg absolute top-2 right-2 cursor-pointer' ></i>
                            <h1 className='text-lg font-semibold'>Edit Zone</h1>
                            <input onChange={handlerEdit} name='zoneNameEdit' value={zoneNameEdit} type="text" placeholder='Zone Name' className="w-full border rounded outline-none py-2 px-3 text-sm placeholder:text-gray-600 "/>
                            <span onClick={updateZone} className="w-full text-white bg-main py-2 flex items-center justify-center cursor-pointer rounded ">Edit</span>
                    </div>
            </div>
        </div>
    );
};

export default Zone; 

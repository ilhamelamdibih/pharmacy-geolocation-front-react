import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const City = () => {
    // État pour stocker la liste des cities 
    const [cityId, setCityId] = useState('');
    const [cities, setCities] = useState([]);
    const [cityName, setCityName] = useState('');
    const [cityNameEdit, setCityNameEdit] = useState('')
    const [cityIdEdit, setCityIdEdit] = useState('')
    

    // Fonction pour récupérer la liste des cities depuis le backend 
    const fetchCities = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/villes');
            setCities(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const addCity = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/villes/save', { nom: cityName });
            setCities([...cities, response.data]);
            setCityName('');
            fetchCities()
        } catch (error) {
            console.error(error);
        }
    };
    const updateCity = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/villes/update', { id: cityIdEdit, nom: cityNameEdit });
            const updatedCities = cities.map((city) => {
                if (city.id === response.data.id) {
                    return response.data;
                }
                return city;
            });
            setCities(updatedCities);
            setCityIdEdit('');
            setCityNameEdit('');
            fetchCities();
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };
    const deleteCity = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8080/api/villes/delete/${id}`);
                    const updatedCities = cities.filter((city) => city.id !== id);
                    setCities(updatedCities);
                    fetchCities();
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
        setCityName(e.target.value);
    };
    const handlerEdit = (e) => {
        e.persist()
        setCityNameEdit(e.target.value);
    }
    useEffect(() => {
        fetchCities();
    }, []);

    const showModal = (id, nom) => {
        const modal = document.querySelector('.editModal')
        modal.classList.add('flex');
        modal.classList.remove('hidden');
        setCityIdEdit(id);
        setCityNameEdit(nom);
    };
    const closeModal = () => {
        const modal = document.querySelector('.editModal')
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    };

    return (
        <div className='py-10 px-7'>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold text-center py-5'>List of cities</h1>
                <div className='relative flex items-center'>
                    <input name='cityName' value={cityName} onChange={handlerAdd} type='text' placeholder='City Name' className='outline-none border rounded p-2 text-sm text-gray-600 w-[250px]' />
                    <span onClick={addCity} className='text-main text-sm absolute right-2 cursor-pointer'>Add</span>
                </div>
            </div>
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-white uppercase bg-main ">
                        <tr className='grid grid-cols-3'>
                            <th scope="col" class="px-6 py-3">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city, index) => (
                            <tr key={city.id} className='bg-white border-b grid grid-cols-3'>
                                <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>{index + 1}</th>
                                <td className='px-6 py-4 text-black'>{city.nom}</td>
                                <td className='px-6 py-4 flex items-center space-x-2'>
                                    <i onClick={() => showModal(city.id, city.nom)} className='bx bx-edit-alt bg-[#FFB30D] text-white p-2 rounded cursor-pointer' ></i>
                                    <i onClick={() => deleteCity(city.id)} className='bx bx-trash-alt bg-red-700 text-white p-2 rounded cursor-pointer' ></i>
                                    <Link to={"/zone?ville=" + city.id + "&name=" + city.nom}>
                                        <div className='flex justify-center items-center text-white bg-main cursor-pointer text-xs space-x-1 rounded'>
                                            <span className='p-2'>Show Zones</span>
                                            <i className='bx bx-chevrons-right text-lg pr-1'></i>
                                        </div>
                                    </Link>
                                </td>
                            </tr>

                        ))}
                        {
                            cities.length === 0 &&
                            <tr className='grid grid-cols-3'>
                                <td className='col-span-3 py-3 flex items-center justify-center font-bold bg-orange-700 text-white'>No cities to show</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
            <div className='editModal hidden items-center justify-center h-screen w-full top-0 fixed'>
                <div className='flex bg-white h-[300px] w-[400px] shadow-lg rounded flex-col space-y-3 py-10 px-6 items-center justify-center relative'>
                    <i onClick={closeModal} className='bx bx-x text-lg absolute top-2 right-2 cursor-pointer' ></i>
                    <h1 className='text-lg font-semibold'>Edit City</h1>
                    <input onChange={handlerEdit} name='cityNameEdit' value={cityNameEdit} type="text" placeholder='City Name' className="w-full border rounded outline-none py-2 px-3 text-sm placeholder:text-gray-600 " />
                    <span onClick={updateCity} className="w-full text-white bg-main py-2 flex items-center justify-center cursor-pointer rounded ">Edit</span>
                </div>
            </div>
        </div>
    );
};

export default City; 
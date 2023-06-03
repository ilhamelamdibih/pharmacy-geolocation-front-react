import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Select from 'react-select'

function Home() {
  const [cities, setCities] = useState([]);

  const [zones, setZones] = useState([]);

  const [zonesAll, setAllZones] = useState([]);

  const [pharmacies, setPharmacies] = useState([]);

  // Fonction pour récupérer la liste des cities depuis le backend 
  const fetchPharmacies = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/pharmacies/withgardes');
      console.log(response.data)
      setPharmacies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/villes');
      const citiesData = response.data.map(city => ({
        value: city.id,
        label: city.nom.toLowerCase()
      }));
      citiesData.unshift({ value: 0, label: 'all' });
      setCities(citiesData);
      console.log("citiesData", citiesData)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchZones = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/zones');
      const zonesData = response.data.map(zone => ({
        value: zone.id,
        label: zone.nom.toLowerCase(),
        city: zone.ville.id
      }));
      zonesData.unshift({ value: 0, label: 'all' });

      setZones(zonesData);
      setAllZones(zonesData)
      console.log("zonesData", zonesData)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchCities();
    fetchZones();
    fetchPharmacies();
  }, [])

  const [zone, setZone] = useState({ value: 0, label: 'all' })

  const handlerZone = (e) => {
    setZone(e)
    console.log(zone)
  }

  const [city, setCity] = useState({ value: 0, label: 'all' })

  const handlerCity = (e) => {
    setCity(e);
    try {
      let filteredZones = zonesAll.filter(zone => {
        if (e.value === 0) {
          return true; // Include all zones
        }
        return zone.city === e.value;
      });

      // Check if the "all" option already exists
      const allOptionIndex = filteredZones.findIndex(zone => zone.value === 0);

      if (allOptionIndex === -1) {
        // Add the "all" option if it doesn't exist
        filteredZones.unshift({ value: 0, label: 'all' });
      } else {
        // Replace the existing "all" option with the latest one
        filteredZones[allOptionIndex] = { value: 0, label: 'all' };
      }

      setZones(filteredZones);
      setZone({ value: 0, label: 'all' })
    } catch (error) {
      console.error(error);
    }
  };
  const customStyles = {
    control: (provided, state) => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      outline: "none",
      border: "solid 1px #E5E7EB",
      borderRadius: "4px",
      backgroundColor: "#ffffff",
      color: "#ffffff",
      fontSize: "12px",
      padding: "0px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#008F8C", // replace with your desired color
    }),
    container: (provided) => ({
      ...provided,
      width: "100%", // replace with your desired width
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "12px", // replace with your desired font size
      backgroundColor: state.isSelected ? "#008F8C" : "white", // replace with your desired color
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return {
        ...provided,
        opacity,
        transition,
        color: "black",
        fontSize: "12px",
      };

    },
  };


  const [search, setSearch] = useState("")

  const handler = (e) => {
    e.persist()
    setSearch(e.target.value)
  }


  const gardes = [
    { value: 0, label: 'All' },
    { value: 1, label: 'Nuit' },
    { value: 2, label: 'Jour' }
  ];




  const [garde, setGarde] = useState({ value: 0, label: 'all' })

  const handlerGarde = (e) => {
    setGarde(e);
  };
  return (
    <div className='flex flex-col py-5 space-y-3 px-10'>
      <h1 className='text-xl text-center'>Pharmacies</h1>
      <div className='flex items-center justify-between pt-2'>
        <div className='flex items-center space-x-1 text-sm'>
          <i className='bx bx-category' ></i>
          <span>Filtre</span>
        </div>
        <div className='flex items-center relative  border py-1 text-xs rounded px-3'>
          <input
            type="text"
            name="search" value={search} onChange={handler}
            className="outline-none placeholder:text-gray-400"
            placeholder="Search for Pharmacies"
          />
          <i className='bx bx-search pl-2' ></i>
        </div>
      </div>

      <div className='grid grid-cols-3 gap-5'>
        <div className='flex flex-col space-y-2'>
          <span className='text-xs text-main'>City :</span>
          <Select
            options={cities}
            styles={customStyles}
            placeholder="Choose a city"
            value={city}
            onChange={handlerCity}
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <span className='text-xs text-main'>Zone :</span>
          <Select
            options={zones}
            styles={customStyles}
            placeholder="Choose a Zone"
            value={zone}
            onChange={handlerZone}
          />
        </div>
        <div className='flex flex-col space-y-2'>
          <span className='text-xs text-main'>Garde :</span>
          <Select
            options={gardes}
            styles={customStyles}
            placeholder="Choose a garde"
            value={garde}
            onChange={handlerGarde}
          />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-5'>
        {
          pharmacies.filter(val => {
            console.log(val)
            if (city.value == 0) {
              if (zone.value == 0 && search == "" && garde.value == 0) {
                return val;
              }
              else if (zone.value == 0 && search == "" && garde.value == val.gardeId) {
                return val;
              }
              else if (zone.value == val.zone.id && search == "" && garde.value == 0) {
                return val;
              }
              else if (zone.value == 0 && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == 0) {
                return val;
              }
              else if (zone.value == 0 && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId) {
                return val;
              }
              else if (zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == 0) {
                return val
              }
              else if (zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId) {
                return val
              }
            }
            else {
              if (city.value == val.zone.ville.id && zone.value == 0 && search == "" && garde.value == 0) {
                return val;
              }
              else if (city.value == val.zone.ville.id && zone.value == 0 && search == "" && garde.value == val.gardeId) {
                return val;
              }
              else if (zone.value == val.zone.id && search == "" && garde.value == 0) {
                return val
              }
              else if (city.value == val.zone.ville.id && zone.value == 0 && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == 0) {
                return val;
              }
              else if (city.value == val.zone.ville.id && zone.value == 0 && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId) {
                return val;
              }
              else if (zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == 0) {
                return val
              }
              else if (zone.value == val.zone.id && val.nom.toLowerCase().includes(search.toLowerCase()) && garde.value == val.gardeId) {
                return val
              }
            }
          }).map(phr => (
            <div className='flex flex-col rounded-md shadow'>
              <img className='h-[250px] rounded-t-md object-cover' src={phr.image} />
              <div className='border-b'>
                <h1 className='py-5 px-3 text-sm'>
                  {phr.nom}
                </h1>
              </div>
              <div className='flex justify-between items-center py-5 px-4'>
                <div className='flex items-center text-gray-400 space-x-1'>
                  <i className='bx bx-map' ></i>
                  <span className='text-sm'>{phr.adresse}</span>
                </div>
                <Link
                  to={{ pathname: `/detail/${phr.id}` }}
                >
                <button className='bg-main text-white px-3 py-1 rounded-full text-sm'>View</button>
                </Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home

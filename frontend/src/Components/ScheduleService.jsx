// src/Components/ScheduledServices.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios'; // Importar la instancia de axios configurada
import './ScheduleService.css'; // Importar estilos específicos
import CalendarFreelancer from './CalendarFreelancer'; // Crear este componente

const ScheduledServices = ({ user }) => { // Recibir el objeto user como prop
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejo de carga
  const [error, setError] = useState(null); // Estado para manejo de errores

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await api.get('/contracts');
        const allContracts = response.data;

        // Filtrar contratos para el freelancer actual
        const freelancerContracts = allContracts.filter(contract => contract.freelancer_id === user.id);

        setContracts(freelancerContracts);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los contratos:', error.response ? error.response.data : error.message);
        setError('Hubo un error al obtener los contratos.');
        setLoading(false);
      }
    };

    fetchContracts();
  }, [user.id]);

  const handleAccept = async (contractId) => {
    try {
      const updatedData = {
        status: 'active',
      };

      const response = await api.put(`/contracts/${contractId}`, updatedData);
      console.log('Contrato aceptado:', response.data.contract);

      // Actualizar el estado local
      setContracts(contracts.map(contract => 
        contract.id === contractId ? { ...contract, status: 'active' } : contract
      ));
      alert('Contrato aceptado exitosamente!');
    } catch (error) {
      console.error('Error al aceptar el contrato:', error.response ? error.response.data : error.message);
      alert('Hubo un error al aceptar el contrato.');
    }
  };

  const handleCancel = async (contractId) => {
    try {
      const updatedData = {
        status: 'cancelled',
      };

      const response = await api.put(`/contracts/${contractId}`, updatedData);
      console.log('Contrato cancelado:', response.data.contract);

      // Actualizar el estado local
      setContracts(contracts.map(contract => 
        contract.id === contractId ? { ...contract, status: 'cancelled' } : contract
      ));
      alert('Contrato cancelado exitosamente!');
    } catch (error) {
      console.error('Error al cancelar el contrato:', error.response ? error.response.data : error.message);
      alert('Hubo un error al cancelar el contrato.');
    }
  };

  // Filtrar contratos activos para el calendario
  const activeContracts = contracts.filter(contract => contract.status === 'active');

  // Verificar contratos activos
  console.log('Contratos Activos para el Calendario:', activeContracts);

  if (loading) {
    return <p>Cargando contratos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Servicios Agendados</h2>
      {contracts.length === 0 ? (
        <p>No tienes servicios agendados.</p>
      ) : (
        <table className="scheduled-table">
          <thead>
            <tr>
              <th>Servicio</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Status</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map(contract => (
              <tr key={contract.id}>
                <td>{contract.service.title}</td>
                <td>{contract.client.name}</td>
                <td>{contract.date}</td>
                <td>{contract.start_time} - {contract.end_time}</td>
                <td>{contract.status}</td>
                <td>
                  {contract.status === 'pending' && (
                    <button 
                      onClick={() => handleAccept(contract.id)} 
                      className="accept-button"
                    >
                      Aceptar
                    </button>
                  )}
                  {contract.status === 'active' && (
                    <button 
                      onClick={() => handleCancel(contract.id)} 
                      className="cancel-button"
                    >
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      {/* Mostrar el calendario con contratos activos */}
      
    </div>
  );
};

export default ScheduledServices;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getUserIdRole from './getUserIdRole';

const { id } = getUserIdRole();
const GetOpenAndClosedTickets = ({ id }) => {
  const [openTickets, setOpenTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async (id) => {
      try {
        const response = await axios.get(`/api/tickets`, {
          params: {
            id: id,
            status: 'Open',
          },
        });
        setOpenTickets(response.data);
      } catch (error) {
        setError('Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>Open Tickets</h3>
      <ul>
        {openTickets.map((ticket) => (
          <li key={ticket.id}>{ticket.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetOpenAndClosedTickets;
